import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTasksByProject } from '../../selectors';
import { addTaskAsync } from '../../action';
import { Icon } from '@iconify/react';
import { API_URL } from '../../config';
import { AddTaskForm } from '../AddTaskForm/AddTaskForm';

export const TaskSearchInput = ({
	selectedProject,
	description,
	setDescription,
	setSelectedTask,
	searchQuery,
	setSearchQuery,
	isAddingTask,
	setIsAddingTask,
}) => {
	const dispatch = useDispatch();
	const reduxTasks =
		useSelector((state) => selectTasksByProject(state, selectedProject)) || [];

	const [debouncedQuery, setDebouncedQuery] = useState('');
	const [filteredTasks, setFilteredTasks] = useState([]);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const blurTimeoutRef = useRef(null);

	useEffect(() => {
		const timer = setTimeout(() => setDebouncedQuery(searchQuery.trim()), 600);
		return () => clearTimeout(timer);
	}, [searchQuery]);

	useEffect(() => {
		if (!debouncedQuery) {
			setFilteredTasks(reduxTasks);
			return;
		}

		if (debouncedQuery.length < 2) {
			setFilteredTasks([]);
			return;
		}

		const abortController = new AbortController();

		const fetchSearchResults = async () => {
			try {
				setIsLoading(true);
				const response = await fetch(
					`${API_URL}/api/tasks?search=${encodeURIComponent(debouncedQuery)}&projectId=${selectedProject}`,
					{ signal: abortController.signal },
				);
				const result = await response.json();
				setFilteredTasks(Array.isArray(result.data) ? result.data : []);
			} catch (err) {
				if (err.name !== 'AbortError') {
					console.error('Ошибка поиска задач:', err);
					setFilteredTasks([]);
				}
			} finally {
				setIsLoading(false);
			}
		};

		fetchSearchResults();
		return () => abortController.abort();
	}, [debouncedQuery, selectedProject]);

	useEffect(() => {
		return () => clearTimeout(blurTimeoutRef.current);
	}, []);

	const handleAddTask = (title) => {
		const newTask = dispatch(
			addTaskAsync({ title, description, projectId: selectedProject }),
		);
		setSelectedTask(newTask);
		setDescription('');
		setSearchQuery(title);
		setShowSuggestions(false);
	};

	const handleSelectTask = (task) => {
		setSelectedTask(task);
		setSearchQuery(task.title || '');
		setDescription(task.description || '');
		setShowSuggestions(false);
	};

	return (
		<div className="flex-1">
			<label className="block text-sm font-medium mb-2 text-gray-700">Задача</label>

			<AddTaskForm
				isAddingTask={isAddingTask}
				setIsAddingTask={setIsAddingTask}
				onAddTask={handleAddTask}
			/>

			<div className="relative">
				<input
					type="text"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					onFocus={() => {
						if (!isAddingTask) {
							setFilteredTasks(debouncedQuery ? filteredTasks : reduxTasks);
							setShowSuggestions(true);
						}
					}}
					onBlur={() => {
						blurTimeoutRef.current = setTimeout(() => {
							setShowSuggestions(false);
						}, 250);
					}}
					disabled={isAddingTask}
					placeholder={
						isAddingTask
							? 'Сначала завершите создание задачи...'
							: 'Поиск или название задачи...'
					}
					className={`w-full border rounded-lg bg-white border-gray-200 pl-4 pr-10 py-2.5 focus:ring-2 focus:ring-green-500 outline-none transition-all ${
						isAddingTask
							? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
							: 'text-gray-700'
					}`}
				/>

				<div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
					{isLoading && (
						<Icon
							icon="svg-spinners:180-ring"
							className="w-4 h-4 text-green-500 animate-spin"
						/>
					)}
					<Icon
						icon="solar:magnifier-linear"
						className={`w-5 h-5 ${isAddingTask ? 'text-gray-300' : 'text-gray-400'}`}
					/>
				</div>

				{showSuggestions && !isAddingTask && (
					<div className="absolute bg-white border border-gray-200 w-full shadow-lg rounded-lg mt-1 z-50 max-h-60 overflow-auto">
						{filteredTasks.map((task) => (
							<div
								key={task.id}
								className="p-2.5 hover:bg-gray-50 cursor-pointer text-sm text-gray-700 transition-colors border-b border-gray-50 last:border-none"
								onMouseDown={() => handleSelectTask(task)}
							>
								{task.title}
							</div>
						))}

						{filteredTasks.length === 0 &&
							searchQuery.trim().length >= 2 &&
							!isLoading && (
								<div className="p-4 text-sm text-gray-400 text-center">
									Ничего не найдено. При старте трекера создастся новая
									задача.
								</div>
							)}
					</div>
				)}
			</div>
		</div>
	);
};

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTasksByProject } from '../../selectors';
import { addTaskAsync } from '../../action';
import { Icon } from '@iconify/react';
import { API_URL } from '../../config';

export const TaskSearchInput = ({
	selectedProject,
	description,
	setDescription,
	disabled = false,
	setSelectedTask,
	searchQuery,
	setSearchQuery,
}) => {
	const tasks = useSelector((state) => selectTasksByProject(state, selectedProject));
	const dispatch = useDispatch();

	const [debouncedQuery, setDebouncedQuery] = useState('');
	const [filteredTasks, setFilteredTasks] = useState([]);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const timer = setTimeout(() => setDebouncedQuery(searchQuery), 1000);
		return () => clearTimeout(timer);
	}, [searchQuery]);

	useEffect(() => {
		if (!debouncedQuery) {
			setFilteredTasks(tasks || []);
			return;
		}
		if (debouncedQuery.length < 2) return; // не дергать API на 1 символ

		const abortController = new AbortController();

		const fetchSearchResults = async () => {
			try {
				setIsLoading(true);
				setError(null);

				const response = await fetch(
					`${API_URL}/api/tasks?search=${debouncedQuery}&projectId=${selectedProject}`,
					{ signal: abortController.signal },
				);

				const result = await response.json();

				setFilteredTasks(Array.isArray(result.data) ? result.data : []);
			} catch (err: any) {
				if (err.name !== 'AbortError') {
					setError(err.message);
					setFilteredTasks([]);
				}
			} finally {
				setIsLoading(false);
			}
		};

		fetchSearchResults();

		return () => abortController.abort();
	}, [debouncedQuery, selectedProject, tasks]);

	const handleAddTask = (title: string) => {
		const newTask = dispatch(
			addTaskAsync({ title, description, projectId: selectedProject }),
		);

		setSelectedTask(newTask);
		setDescription('');
		setSearchQuery(title);
		setShowSuggestions(false);
	};

	return (
		<div className="flex-1">
			<label className={`block text-sm font-medium mb-2 text-gray-700 `}>
				Задача
			</label>
			<div className="relative">
				<input
					type="text"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					onFocus={() => {
						if (!disabled) {
							setFilteredTasks(tasks);
							setShowSuggestions(true);
						}
					}}
					onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
					placeholder={
						disabled
							? 'Сначала выберите проект'
							: 'Поиск или название задачи...'
					}
					disabled={disabled}
					className={`w-full border rounded-lg bg-white border-gray-200  pl-4 pr-10 py-2.5 focus:ring-2 focus:ring-green-500 outline-none transition-all ${
						disabled
							? '!bg-gray-100 !border-gray-200 !text-gray-400 cursor-not-allowed'
							: 'text-gray-700'
					}`}
				/>
				<Icon
					icon="solar:magnifier-linear"
					className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
						disabled ? 'text-gray-300' : 'text-gray-400'
					}`}
				/>
				{showSuggestions && (
					<div className="absolute bg-white border w-full shadow-lg rounded-lg mt-1 z-50 max-h-60 overflow-auto">
						{filteredTasks.map((task) => (
							<div
								key={task.id}
								className="p-2 hover:bg-gray-100 cursor-pointer"
								onClick={() => {
									setSelectedTask(task);
									setSearchQuery(task.title);
									setDescription(task.description || '');
									setShowSuggestions(false);
								}}
							>
								{task.title}
							</div>
						))}

						{filteredTasks.length === 0 && searchQuery && (
							<div
								className="p-2 hover:bg-gray-100 cursor-pointer text-green-600"
								onClick={() => handleAddTask(searchQuery)}
							>
								Создать задачу "{searchQuery}"
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { selectUser } from '../../selectors';
import { addTimeEntry } from '../../action';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { DropDown } from '../DropDown/DropDown';

export const Timer = () => {
	const dispatch = useAppDispatch();
	const user = useAppSelector(selectUser);
	const [isRunning, setIsRunning] = useState(false);
	const [time, setTime] = useState(0);
	const [comment, setComment] = useState('');
	const [selectedProject, setSelectedProject] = useState('');
	const [selectedTask, setSelectedTask] = useState('');
	const [startTime, setStartTime] = useState<Date | null>(null);

	// Получаем проекты и задачи из состояния
	const projects = useAppSelector((state) => state.projects.items);
	const tasks = useAppSelector((state) => state.tasks.items);

	// Фильтруем задачи по выбранному проекту
	const filteredTasks = selectedProject
		? tasks.filter((task) => task.projectId === selectedProject)
		: tasks;

	useEffect(() => {
		let interval: NodeJS.Timeout | null = null;

		if (isRunning) {
			interval = setInterval(() => {
				setTime((prevTime) => prevTime + 1000);
			}, 100);
		} else if (interval) {
			clearInterval(interval);
		}

		return () => {
			if (interval) clearInterval(interval);
		};
	}, [isRunning]);

	const handleStart = () => {
		if (!selectedTask) {
			alert('Please select a task');
			return;
		}
		setIsRunning(true);
		setStartTime(new Date());
	};

	const handleStop = () => {
		if (!isRunning || !startTime || !user || !selectedTask) return;

		const endTime = new Date();
		const duration = time; // duration in milliseconds

		// Отправляем запись времени в хранилище
		dispatch(
			addTimeEntry({
				owner: user._id,
				taskId: selectedTask,
				startTime: startTime.toISOString(),
				endTime: endTime.toISOString(),
				duration: duration,
				comment: comment,
			}),
		);

		setIsRunning(false);
		setTime(0);
		setComment('');
		setStartTime(null);
	};

	// Форматирование времени в HH:MM:SS
	const formatTime = (milliseconds: number) => {
		const seconds = Math.floor(milliseconds / 1000) % 60;
		const minutes = Math.floor(milliseconds / (1000 * 60)) % 60;
		const hours = Math.floor(milliseconds / (1000 * 60));

		return `${hours.toString().padStart(2, '0')}:${minutes
			.toString()
			.padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
	};

	return (
		<div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
			<h2 className="text-xl font-semibold mb-4">Timer</h2>

			<div className="mb-4">
				<label className="block text-gray-700 text-sm font-medium mb-2">
					Project
				</label>
				<DropDown
					options={projects.map((project) => ({
						value: project.id,
						label: project.title,
					}))}
					value={selectedProject}
					onChange={(value) => {
						setSelectedProject(value);
						// Сбрасываем выбранную задачу при смене проекта
						setSelectedTask('');
					}}
					placeholder="Select a project"
				/>
			</div>

			<div className="mb-4">
				<label className="block text-gray-700 text-sm font-medium mb-2">
					Task
				</label>
				<DropDown
					options={filteredTasks.map((task) => ({
						value: task.id,
						label: task.title,
					}))}
					value={selectedTask}
					onChange={setSelectedTask}
					placeholder="Select a task"
					disabled={!selectedProject}
				/>
			</div>

			<div className="mb-4">
				<label className="block text-gray-700 text-sm font-medium mb-2">
					Comment
				</label>
				<Input
					type="text"
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					placeholder="Add a comment"
				/>
			</div>

			<div className="text-3xl font-mono text-center mb-6">{formatTime(time)}</div>

			<div className="flex justify-center space-x-4">
				<Button
					onClick={isRunning ? handleStop : handleStart}
					variant={isRunning ? 'secondary' : 'primary'}
				>
					{isRunning ? 'Stop' : 'Start'}
				</Button>
			</div>
		</div>
	);
};

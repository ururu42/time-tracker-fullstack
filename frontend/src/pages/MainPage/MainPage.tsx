import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import {
	addTaskAsync,
	fetchProjects,
	fetchTasksForProject,
	updateTaskAsync,
	saveTimeEntryAsync,
} from '../../action';
import { selectProjects, selectUser, selectTaskById, selectTasks } from '../../selectors';
import { DropDown, TaskSearchInput, Timer } from '../../components';
import {
	HeaderMainPage,
	Main,
	TaskTextarea,
	TrackerComment,
	TrackerButtons,
	TodayTimeEntries,
	Statistics,
} from './components';
import { Icon } from '@iconify/react';

export const MainPage = () => {
	const dispatch = useDispatch();
	const projects = useSelector(selectProjects);
	const user = useSelector(selectUser);

	const [selectedProject, setSelectedProject] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const tasks = useSelector(selectTasks);
	const [selectedTask, setSelectedTask] = useState(null);
	const [descriptionTask, setDescriptionTask] = useState('');
	const [timerComment, setTimerComment] = useState('');

	// --- таймер ---
	const [elapsedTime, setElapsedTime] = useState(0);
	const [isRunning, setIsRunning] = useState(false);
	const [startTime, setStartTime] = useState(null);
	const intervalRef = useRef(null);

	const [saveMessage, setSaveMessage] = useState('');

	if (!user || !user.id) return <Navigate to="/login" replace />;

	// загрузка проектов
	useEffect(() => {
		dispatch(fetchProjects());
	}, [dispatch]);
	useEffect(() => {
		if (selectedProject) dispatch(fetchTasksForProject(selectedProject));
	}, [dispatch, selectedProject]);

	useEffect(() => {
		if (selectedTask) setDescriptionTask(selectedTask.description || '');
		else setDescriptionTask('');
	}, [selectedTask]);

	const projectOptions = projects.map((project) => ({
		value: project.id.toString(),
		label: project.title,
	}));

	// --- функции таймера ---
	const startTimer = () => {
		setIsRunning(true);
		setStartTime(new Date());
		intervalRef.current = setInterval(() => {
			setElapsedTime((prev) => prev + 1000);
		}, 1000);
	};

	const stopTimer = () => {
		clearInterval(intervalRef.current);
		setIsRunning(false);
	};

	useEffect(() => {
		return () => clearInterval(intervalRef.current);
	}, []);

	useEffect(() => {
		if (saveMessage) {
			const timer = setTimeout(() => setSaveMessage(''), 3000);
			return () => clearTimeout(timer);
		}
	}, [saveMessage]);

	// --- создание/обновление задачи ---
	const getOrCreateTask = async () => {
		let taskToUse = selectedTask;

		if (!taskToUse && searchQuery) {
			taskToUse = await dispatch(
				addTaskAsync({
					title: searchQuery,
					description: descriptionTask,
					projectId: selectedProject,
				}),
			);
			setSelectedTask(taskToUse);
		}

		if (!taskToUse) {
			alert('Введите или выберите задачу');
			return null;
		}

		if (taskToUse.description !== descriptionTask) {
			await dispatch(
				updateTaskAsync(taskToUse.id, { description: descriptionTask }),
			);
		}

		return taskToUse;
	};

	// --- сохранение таймера ---
	const saveTimerEntry = async () => {
		const currentTask = await getOrCreateTask();
		if (!currentTask) return;

		stopTimer();

		const endTime = new Date();
		const durationMs = endTime - startTime;

		console.log(durationMs);

		await dispatch(
			saveTimeEntryAsync({
				startTime: startTime.toISOString(),
				endTime: endTime.toISOString(),
				duration: durationMs,
				taskId: currentTask.id,
				comment: timerComment,
			}),
		);

		const projectObj = projects.find((p) => p.id === selectedProject);

		setSaveMessage(
			`Данные по задаче и времени сохранены в Проект ${projectObj.title}`,
		);

		// очистка
		setElapsedTime(0);
		setIsRunning(false);
		setStartTime(null);
		setTimerComment('');

		setSelectedProject('');

		setSelectedTask(null);
		setSearchQuery('');
		setDescriptionTask('');
	};

	const onCancelAll = () => {
		setElapsedTime(0);
		setIsRunning(false);
		setStartTime(null);
		setTimerComment('');

		setSelectedProject('');

		setSelectedTask(null);
		setSearchQuery('');
		setDescriptionTask('');
	};

	console.log('tasks', tasks);

	const onPlayEntry = async (projectId, taskId, comment) => {
		console.log('projectId', projectId);
		const currentTask = tasks.byId[taskId];

		if (!currentTask) {
			const tasks = await dispatch(fetchTasksForProject(projectId));
			console.log('tasks in onPlay', tasks);
			// const currentTask = tasks.byId[taskId];
		}

		console.log('currentTask', currentTask);
		setSelectedProject(projectId);
		setSelectedTask(currentTask);
		setTimerComment(comment);
		setDescriptionTask(currentTask?.description || '');

		startTimer();
	};

	console.log('selectedTask', selectedTask);

	return (
		<Main>
			<HeaderMainPage user={user} />
			<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-4">
				<div className="flex items-center justify-between mb-6">
					<DropDown
						className="w-full"
						options={projectOptions}
						value={selectedProject}
						onChange={setSelectedProject}
						selectedProject={selectedProject}
						setSelectedTask={setSelectedTask}
						setSearchQuery={setSearchQuery}
						setDescriptionTask={setDescriptionTask}
						placeholder="Выберите проект"
					/>

					{/* Таймер - только UI */}
					<Timer
						elapsedTime={elapsedTime}
						isRunning={isRunning}
						startTimer={startTimer}
						stopTimer={stopTimer}
						disabled={!selectedProject || !selectedTask}
					/>
				</div>
				{selectedProject && (
					<>
						{' '}
						<TaskSearchInput
							selectedProject={selectedProject}
							description={descriptionTask}
							setDescription={setDescriptionTask}
							setSelectedTask={setSelectedTask}
							searchQuery={searchQuery}
							setSearchQuery={setSearchQuery}
							disabled={!selectedProject}
						/>
						{selectedTask && (
							<>
								<TaskTextarea
									description={descriptionTask}
									setDescription={setDescriptionTask}
									disabled={!selectedProject}
								/>

								<TrackerComment
									timerComment={timerComment}
									setTimerComment={setTimerComment}
									disabled={!selectedProject}
								/>

								<TrackerButtons
									onSaveTimerEntryWithAll={saveTimerEntry}
									isRunning={isRunning}
									elapsedTime={elapsedTime}
									onCancel={onCancelAll}
								/>
							</>
						)}
					</>
				)}
			</div>

			<div className="grid grid-cols-3 gap-3">
				{saveMessage && (
					<div className="col-span-3 bg-green-100 text-green-800 px-4 py-2 rounded mb-2 shadow-sm">
						{saveMessage}
					</div>
				)}
				<TodayTimeEntries onClick={onPlayEntry} />
				<Statistics />
			</div>
		</Main>
	);
};

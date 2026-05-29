import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { store } from '../../store';
import {
	addTaskAsync,
	fetchProjects,
	fetchTasksForProject,
	updateTaskAsync,
	saveTimeEntryAsync,
	ACTION_TYPE,
} from '../../action';
import {
	selectProjects,
	selectUser,
	selectTasks,
	selectIsLoading,
} from '../../selectors';
import {
	DropDown,
	TaskSearchInput,
	Timer,
	HeaderAllPage,
	Loader,
} from '../../components';
import {
	TaskTextarea,
	TrackerComment,
	TrackerButtons,
	TodayTimeEntries,
	Statistics,
} from './components';
import { AddProjectForm } from '../ProjectsPage/components/AddProjectForm/AddProjectForm';
import { Icon } from '@iconify/react';

export const MainPage = () => {
	const dispatch = useDispatch();
	const projects = useSelector(selectProjects);
	const user = useSelector(selectUser);

	const isLoading = useSelector(selectIsLoading);
	const [selectedProject, setSelectedProject] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const tasks = useSelector(selectTasks);
	const [selectedTask, setSelectedTask] = useState(null);
	const [descriptionTask, setDescriptionTask] = useState('');
	const [timerComment, setTimerComment] = useState('');

	const [elapsedTime, setElapsedTime] = useState(0);
	const [isRunning, setIsRunning] = useState(false);
	const [startTime, setStartTime] = useState(null);
	const intervalRef = useRef(null);

	const [saveMessage, setSaveMessage] = useState('');

	const [isAddProject, setIsAddProject] = useState(false);
	const [dropDownDisabled, setDropDownDisableb] = useState(false);

	const [isAddingTask, setIsAddingTask] = useState(false);

	useEffect(() => {
		dispatch({ type: ACTION_TYPE.SET_LOADING, payload: true });
		dispatch(fetchProjects(1, 100));
	}, [dispatch]);

	useEffect(() => {
		if (selectedProject) dispatch({ type: ACTION_TYPE.SET_LOADING, payload: true });
		dispatch(fetchTasksForProject(selectedProject));
	}, [dispatch, selectedProject]);

	useEffect(() => {
		if (selectedTask) setDescriptionTask(selectedTask.description || '');
		else setDescriptionTask('');
	}, [selectedTask]);

	const projectOptions = projects.map((project) => ({
		value: project.id.toString(),
		label: project.title,
	}));

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

	const getOrCreateTask = async () => {
		let taskToUse = selectedTask;

		try {
			if (!taskToUse && searchQuery) {
				dispatch({ type: ACTION_TYPE.SET_LOADING, payload: true });
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

			if (taskToUse.id && taskToUse.description !== descriptionTask) {
				dispatch({ type: ACTION_TYPE.SET_LOADING, payload: true });
				await dispatch(
					updateTaskAsync(taskToUse.id, { description: descriptionTask }),
				);
			}

			return taskToUse;
		} catch (error) {
			console.error('Не удалось обработать задачу:', error);
			alert(
				'Произошла ошибка при сохранении задачи. Пожалуйста, попробуйте еще раз.',
			);
			return null;
		} finally {
			dispatch({ type: ACTION_TYPE.SET_LOADING, payload: false });
		}
	};

	const saveTimerEntry = async () => {
		const currentTask = await getOrCreateTask();
		if (!currentTask) return;

		stopTimer();

		const endTime = new Date();

		const durationMs = elapsedTime;

		const calculatedStartTime = new Date(endTime.getTime() - durationMs);

		dispatch({ type: ACTION_TYPE.SET_LOADING, payload: true });
		await dispatch(
			saveTimeEntryAsync({
				startTime: calculatedStartTime.toISOString(),
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

	const onPlayEntry = async (projectId, taskId, comment) => {
		let currentTask = tasks.byId[taskId];

		if (!currentTask) {
			dispatch({ type: ACTION_TYPE.SET_LOADING, payload: true });
			await dispatch(fetchTasksForProject(projectId));
			const updatedState = store.getState();
			currentTask = updatedState.tasks.byId[taskId];
		}
		setSelectedProject(projectId);
		setSelectedTask(currentTask);
		setSearchQuery(currentTask.title);
		setTimerComment(comment);
		setDescriptionTask(currentTask?.description || '');

		startTimer();
	};

	return (
		<main className=" flex-1 min-h-screen bg-gray-50 ">
			{isLoading && <Loader />}

			<HeaderAllPage children={`Привет, ${user.name}!`} />

			<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-4">
				<div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-6 gap-4">
					<div className="flex flex-col lg:flex-row items-start lg:items-end gap-3 flex-grow w-full lg:max-w-2xl">
						<div className="w-full lg:w-64 flex-shrink-0">
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Выбор проекта
							</label>
							<DropDown
								className="w-full"
								options={projectOptions}
								setSelectedProject={setSelectedProject}
								selectedProject={selectedProject}
								setSelectedTask={setSelectedTask}
								setSearchQuery={setSearchQuery}
								setDescriptionTask={setDescriptionTask}
								placeholder="Выберите проект"
								disabled={dropDownDisabled}
							/>
						</div>

						<button
							className="flex items-center justify-center h-8 px-3 bg-white rounded-full mb-2"
							onClick={() => {
								setIsAddProject(!isAddProject);
								setDropDownDisableb(!dropDownDisabled);
							}}
						>
							<Icon
								icon="solar:add-circle-bold"
								className="text-emerald-600 w-5 h-5 mr-1.5"
							/>
							<span className="text-sm font-medium text-gray-700 whitespace-nowrap">
								Новый проект
							</span>
						</button>
					</div>
					<Timer
						elapsedTime={elapsedTime}
						isRunning={isRunning}
						startTimer={startTimer}
						stopTimer={stopTimer}
						disabled={!selectedProject || (!selectedTask && !searchQuery)}
					/>
				</div>

				{isAddProject && (
					<AddProjectForm
						setIsAddProject={setIsAddProject}
						isAddProject={isAddProject}
						setDropDownDisableb={setDropDownDisableb}
						dropDownDisabled={dropDownDisabled}
						setSelectedProject={setSelectedProject}
					/>
				)}

				{selectedProject && !isAddProject && (
					<div className="space-y-4 animate-in fade-in duration-300">
						<TaskSearchInput
							selectedProject={selectedProject}
							description={descriptionTask}
							setDescription={setDescriptionTask}
							setSelectedTask={setSelectedTask}
							searchQuery={searchQuery}
							setSearchQuery={setSearchQuery}
							isAddingTask={isAddingTask}
							setIsAddingTask={setIsAddingTask}
						/>
						{selectedTask && (
							<>
								<TaskTextarea
									description={descriptionTask}
									setDescription={setDescriptionTask}
								/>

								<TrackerComment
									timerComment={timerComment}
									setTimerComment={setTimerComment}
								/>

								<TrackerButtons
									onSaveTimerEntryWithAll={saveTimerEntry}
									isRunning={isRunning}
									elapsedTime={elapsedTime}
									onCancel={onCancelAll}
								/>
							</>
						)}
					</div>
				)}
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
				{saveMessage && (
					<div className="col-span-1 lg:col-span-3 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl mb-2 shadow-sm flex items-center gap-2">
						<Icon
							icon="solar:check-circle-bold"
							className="w-5 h-5 text-green-500"
						/>
						{saveMessage}
					</div>
				)}
				<TodayTimeEntries onClick={onPlayEntry} isPlayTracker={isRunning} />
				<Statistics />
			</div>
		</main>
	);
};

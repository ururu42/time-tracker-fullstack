import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { store } from '../../store';
import {
	addTaskAsync,
	fetchProjects,
	fetchTasksForProject,
	updateTaskAsync,
	ACTION_TYPE,
	startTimerSessionAsync,
	fetchActiveTimerAsync,
	finishTimerSessionAsync,
	cancelTimerSessionAsync,
	updateTimerSessionCommentAsync,
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
import { API_URL } from '../../config';

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

	const [activeSession, setActiveSession] = useState(null);
	const [serverOffset, setServerOffset] = useState(0);
	const [now, setNow] = useState(Date.now());

	const [saveMessage, setSaveMessage] = useState('');

	const [isAddProject, setIsAddProject] = useState(false);
	const [dropDownDisabled, setDropDownDisableb] = useState(false);

	const [isAddingTask, setIsAddingTask] = useState(false);

	const isRunning = !!activeSession;

	const activeSessionRef = useRef(null);
	useEffect(() => {
		activeSessionRef.current = activeSession;
	}, [activeSession]);

	const timerCommentRef = useRef('');
	useEffect(() => {
		timerCommentRef.current = timerComment;
	}, [timerComment]);

	const elapsedMs = activeSession
		? Math.max(0, now + serverOffset - new Date(activeSession.startTime).getTime())
		: 0;

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

	// «Часы» таймера: тик раз в секунду только обновляет отображение.
	// Фактическое время всегда считается как now - startTime (штамп сервера),
	// поэтому отсчёт не сбивается, даже если вкладка в фоновом режиме
	// или браузер находится на других сайтах.
	useEffect(() => {
		if (!activeSession) return;
		setNow(Date.now());
		const id = setInterval(() => setNow(Date.now()), 1000);
		return () => clearInterval(id);
	}, [activeSession]);

	// Восстановление таймера, который идёт на сервере (после F5 / reopening страницы)
	useEffect(() => {
		let cancelled = false;

		const restore = async () => {
			const result = await dispatch(fetchActiveTimerAsync());
			if (cancelled || !result?.session) return;

			const session = result.session;
			setServerOffset(new Date(result.serverTime).getTime() - Date.now());
			setActiveSession(session);
			setTimerComment(session.comment || '');
			setSelectedProject(session.projectId);
			setSearchQuery(session.taskTitle);
		};

		restore();
		return () => {
			cancelled = true;
		};
	}, [dispatch]);

	// Подцепить выбранную задачу, как только загрузятся задачи проекта
	useEffect(() => {
		if (activeSession && tasks.byId?.[activeSession.taskId]) {
			setSelectedTask(tasks.byId[activeSession.taskId]);
		}
	}, [activeSession, tasks]);

	// Синхронизация комментария на сервере, пока идёт таймер
	useEffect(() => {
		if (!activeSession) return;
		const id = setTimeout(() => {
			dispatch(updateTimerSessionCommentAsync({ comment: timerComment }));
		}, 1000);
		return () => clearTimeout(id);
	}, [dispatch, timerComment, activeSession]);

	// Автосейв: закрытие вкладки / браузера / обновление страницы →
	// сессия сохраняется на сервере (дублирующий вызов безопасен: finish атомарный)
	useEffect(() => {
		const finishOnUnload = () => {
			if (!activeSessionRef.current) return;

			fetch(`${API_URL}/api/timer/finish`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
				credentials: 'include',
				keepalive: true,
				body: JSON.stringify({ comment: timerCommentRef.current }),
			}).catch(() => {});
		};

		window.addEventListener('beforeunload', finishOnUnload);
		window.addEventListener('pagehide', finishOnUnload);
		return () => {
			window.removeEventListener('beforeunload', finishOnUnload);
			window.removeEventListener('pagehide', finishOnUnload);
		};
	}, []);

	const startTimer = async () => {
		if (activeSession) {
			setSaveMessage('Таймер уже идёт');
			return;
		}

		const task = await getOrCreateTask();
		if (!task) return;

		dispatch({ type: ACTION_TYPE.SET_LOADING, payload: true });
		const result = await dispatch(
			startTimerSessionAsync({ taskId: task.id, comment: timerComment }),
		);
		dispatch({ type: ACTION_TYPE.SET_LOADING, payload: false });

		if (result?.status === 'ALREADY_RUNNING') {
			setSaveMessage('Таймер уже идёт');
			const current = await dispatch(fetchActiveTimerAsync());
			if (current?.session) {
				setServerOffset(new Date(current.serverTime).getTime() - Date.now());
				setActiveSession(current.session);
				setTimerComment(current.session.comment || '');
				setSelectedProject(current.session.projectId);
				setSearchQuery(current.session.taskTitle);
			}
			return;
		}

		if (result?.status === 'OK' && result.session) {
			setServerOffset(new Date(result.serverTime).getTime() - Date.now());
			setActiveSession(result.session);
			return;
		}

		setSaveMessage('Не удалось запустить таймер. Попробуйте ещё раз.');
	};

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

	const resetTimerUI = () => {
		setActiveSession(null);
		setServerOffset(0);
		setTimerComment('');
		setSelectedProject('');
		setSelectedTask(null);
		setSearchQuery('');
		setDescriptionTask('');
	};

	const saveTimerEntry = async () => {
		if (!activeSession) return;

		// Синхронизируем описание задачи, если оно изменилось
		const currentTask = tasks.byId?.[activeSession.taskId];
		if (currentTask && currentTask.description !== descriptionTask) {
			dispatch({ type: ACTION_TYPE.SET_LOADING, payload: true });
			await dispatch(updateTaskAsync(currentTask.id, { description: descriptionTask }));
		}

		dispatch({ type: ACTION_TYPE.SET_LOADING, payload: true });
		const entry = await dispatch(finishTimerSessionAsync({ comment: timerComment }));
		dispatch({ type: ACTION_TYPE.SET_LOADING, payload: false });

		if (!entry) {
			setSaveMessage('Не удалось сохранить таймер. Попробуйте ещё раз.');
			return;
		}

		const projectTitle =
			projects.find((p) => p.id === activeSession.projectId)?.title ||
			activeSession.projectTitle ||
			'проект';

		setSaveMessage(`Данные по задаче и времени сохранены в Проект ${projectTitle}`);
		resetTimerUI();
	};

	const onCancelAll = () => {
		if (!activeSession) return;

		if (!confirm('Отменить таймер? Набранное время будет удалено.')) return;

		dispatch(cancelTimerSessionAsync());
		resetTimerUI();
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

		await startTimer();
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
						elapsedTime={elapsedMs}
						isRunning={isRunning}
						startTimer={startTimer}
						onStopTimer={saveTimerEntry}
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
									elapsedTime={elapsedMs}
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

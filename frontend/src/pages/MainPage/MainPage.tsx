import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchProjects, fetchTasksForProject } from '../../action';
import { selectProjects, selectUser } from '../../selectors';
import { DropDown, P, TaskSearchInput, Timer } from '../../components';
import {
	HeaderMainPage,
	Main,
	TrackerButtons,
	TaskTextarea,
	TrackerComment,
	TodayTimeEntries,
	Statistics,
} from './components';
import { Icon } from '@iconify/react';

export const MainPage = () => {
	const dispatch = useDispatch();

	const projects = useSelector(selectProjects);
	const user = useSelector(selectUser);

	const [selectedProject, setSelectedProject] = useState('');
	const [selectedTask, setSelectedTask] = useState(null);
	const [description, setDescription] = useState('');

	const [timerComment, setTimerComment] = useState('');

	if (!user || !user.id) {
		return <Navigate to="/login" replace />;
	}

	// загрузка проектов
	useEffect(() => {
		dispatch(fetchProjects());
	}, [dispatch]);

	// загрузка задач проекта
	useEffect(() => {
		if (selectedProject) {
			dispatch(fetchTasksForProject(selectedProject));
		}
	}, [dispatch, selectedProject]);

	const projectOptions = projects.map((project) => ({
		value: project.id.toString(),
		label: project.title,
	}));

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
						placeholder="Выберите проект"
					/>

					<Timer
						task={selectedTask}
						comment={timerComment}
						setComment={setTimerComment}
						disabled={!selectedProject}
					/>
				</div>
				<TaskSearchInput
					selectedProject={selectedProject}
					description={description}
					setDescription={setDescription}
					setSelectedTask={setSelectedTask}
					disabled={!selectedProject}
				/>
				<TaskTextarea
					description={description}
					setDescription={setDescription}
					disabled={!selectedProject}
				/>
				<TrackerComment
					timerComment={timerComment}
					setTimerComment={setTimerComment}
					disabled={!selectedProject}
				/>
				<TrackerButtons />
			</div>

			<div className="grid grid-cols-3 gap-6">
				<TodayTimeEntries />
				<Statistics />
			</div>
		</Main>
	);
};

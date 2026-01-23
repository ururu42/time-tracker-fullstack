import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjectWithTasks } from '../../../../action';
import { selectProjectWithTasks } from '../../../../selectors';
import { H1 } from '../../../../components';
import { Icon } from '@iconify/react';

export const Project = () => {
	const params = useParams();
	const project = useSelector(selectProjectWithTasks);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(fetchProjectWithTasks(params.id));
	}, [dispatch, params.id]);

	console.log(project);
	console.log(params.id, 'params');

	return (
		<>
			<div>
				<div>
					<Icon
						icon="fluent:arrow-circle-left-28-filled"
						className="w-8 h-8 text-gray-600 hover:text-gray-700"
					/>
					<H1>Проект {project.title}</H1>
				</div>
				<div>
					<p>Осписание проекта:</p>
					<div>{project.description}</div>
				</div>
				<div>
					<p>Задачи</p>
					<div>
						{project.tasks.map((task) => (
							<div key={task._id}>
								<div>{task.title}</div>
								<div>{task.description}</div>
								<div>{task.status}</div>
								<div>{task.priority}</div>
								<div>{task.createdAt}</div>
								<div>{task.updatedAt}</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

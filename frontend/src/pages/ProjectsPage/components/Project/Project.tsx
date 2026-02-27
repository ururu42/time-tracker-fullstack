import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
	fetchcurrentProject,
	removeProjectAsync,
	fetchTasksForProject,
} from '../../../../action';
import { selectCurrentProject } from '../../../../selectors';
import { H1, GoBackButton } from '../../../../components';
import { Tasks } from './components/Tasks/Tasks';
import { EditProject } from '../ProjectList/components/EditProject/EditProject';
import { Icon } from '@iconify/react';

export const Project = () => {
	const { id } = useParams();
	const project = useSelector(selectCurrentProject);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [isEditing, setIsEditing] = useState(false);
	const [editForm, setEditForm] = useState({ title: '', description: '' });

	// 🔹 Загружаем проект и задачи при монтировании или смене id
	useEffect(() => {
		if (id) {
			// Загружаем проект
			dispatch(fetchcurrentProject(id));

			// Загружаем задачи по projectId напрямую
			dispatch(fetchTasksForProject(id));
		}
	}, [dispatch, id]);

	const onProjectEdit = (project) => {
		setEditForm({ title: project.title, description: project.description });
		setIsEditing(true);
	};

	const onProjectRemove = (projectId) => {
		dispatch(removeProjectAsync(projectId));
		navigate('/projects');
	};

	// 🔹 Лоадер проекта
	if (!project) {
		return (
			<div className="max-w-6xl mx-auto p-8">
				<div className="bg-white rounded-2xl shadow-md p-8">
					<div className="flex items-center mb-6">
						<GoBackButton onClick={() => navigate('/projects')} />
						<div>
							<div className="animate-pulse bg-gray-200 h-8 w-64 rounded"></div>
							<div className="animate-pulse bg-gray-200 h-4 w-96 mt-2 rounded"></div>
						</div>
					</div>
					<div className="text-center py-12">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
						<p className="mt-4 text-gray-600">Загрузка проекта...</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-6xl mx-auto p-8">
			<div className="bg-white rounded-2xl shadow-md p-8">
				{isEditing ? (
					<EditProject
						project={project}
						setEditForm={setEditForm}
						editForm={editForm}
					/>
				) : (
					<>
						<div className="flex items-center mb-6 gap-4">
							<GoBackButton onClick={() => navigate('/projects')} />

							<H1 className="text-3xl font-bold text-gray-800 flex-grow">
								Проект: {project.title}
							</H1>

							<Icon
								icon="mdi:edit"
								className="w-8 h-8 text-gray-600 hover:text-gray-700 cursor-pointer"
								onClick={() => navigate(`/projects/${project.id}/edit`)}
							/>

							<Icon
								icon="mdi:delete-forever"
								className="w-10 h-10 text-red-600 hover:text-red-700 ml-2 cursor-pointer"
								onClick={() => onProjectRemove(project.id)}
							/>
						</div>

						<div className="mb-8">
							<h2 className="text-xl font-semibold text-gray-700 mb-4">
								Описание проекта
							</h2>
							<div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
								<p className="text-gray-600">{project.description}</p>
							</div>
						</div>
					</>
				)}

				<Tasks project={project} />
			</div>
		</div>
	);
};

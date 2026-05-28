import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
	fetchcurrentProject,
	removeProjectAsync,
	fetchTasksForProject,
	ACTION_TYPE,
} from '../../../../action';
import { selectCurrentProject, selectIsLoading } from '../../../../selectors';
import { H1, GoBackButton, Loader } from '../../../../components';
import { Tasks } from './components/Tasks/Tasks';
import { EditProject } from '../ProjectList/components/EditProject/EditProject';
import { Icon } from '@iconify/react';

export const Project = () => {
	const { id } = useParams();
	const currentProject = useSelector(selectCurrentProject);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [isEditing, setIsEditing] = useState(false);
	const isLoading = useSelector(selectIsLoading);

	useEffect(() => {
		if (id) {
			dispatch({ type: ACTION_TYPE.SET_LOADING, payload: true });
			Promise.all([
				dispatch(fetchcurrentProject(id)),
				dispatch(fetchTasksForProject(id)),
			]).finally(() => {
				dispatch({ type: ACTION_TYPE.SET_LOADING, payload: false });
			});
		}
	}, [dispatch, id]);

	const onProjectRemove = async (projectId) => {
		if (window.confirm('Действительно удалить проект?')) {
			try {
				dispatch({ type: ACTION_TYPE.SET_LOADING, payload: true });

				await dispatch(removeProjectAsync(projectId));

				navigate('/projects');
			} catch (error) {
				console.error('Не удалось удалить проект:', error);
				alert('Произошла ошибка при удалении проекта. Попробуйте позже.');
			} finally {
				dispatch({ type: ACTION_TYPE.SET_LOADING, payload: false });
			}
		}
	};

	if (isLoading || !currentProject) {
		return <Loader />;
	}

	return (
		<div className="max-w-6xl mx-auto p-8 relative">
			<div className="bg-white rounded-2xl shadow-md p-8">
				{isEditing ? (
					<EditProject
						currentProject={currentProject}
						setIsEditing={setIsEditing}
						isEditing={isEditing}
					/>
				) : (
					<>
						<div className="flex items-center mb-6 gap-4">
							<GoBackButton onClick={() => navigate('/projects')} />
							<H1 className="text-3xl font-bold text-gray-800 flex-grow">
								Проект: {currentProject?.title || 'Загрузка...'}
							</H1>

							<Icon
								icon="mdi:edit"
								className="w-8 h-8 text-gray-600 hover:text-gray-700 cursor-pointer"
								onClick={() => setIsEditing(!isEditing)}
							/>

							<Icon
								icon="mdi:delete-forever"
								className="w-10 h-10 text-red-600 hover:text-red-700 ml-2 cursor-pointer"
								onClick={() => onProjectRemove(currentProject?.id)}
							/>
						</div>

						<div className="mb-8">
							<h2 className="text-xl font-semibold text-gray-700 mb-4">
								Описание проекта
							</h2>
							<div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
								<p className="text-gray-600">
									{currentProject?.description || 'Нет описания'}
								</p>
							</div>
						</div>
					</>
				)}

				<Tasks project={currentProject} />
			</div>
		</div>
	);
};

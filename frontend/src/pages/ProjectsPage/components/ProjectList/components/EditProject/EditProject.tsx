import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectIsLoading } from '../../../../../../selectors';
import { Form, Loader } from '../../../../../../components';
import {
	updateProjectAsync,
	ACTION_TYPE,
	fetchcurrentProject,
} from '../../../../../../action';

export const EditProject = ({ currentProject, setIsEditing, isEditing }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [newTitle, setNewTitle] = useState('');
	const [newDescription, setNewDescription] = useState('');

	const isLoading = useSelector(selectIsLoading);

	useEffect(() => {
		if (currentProject) {
			dispatch({ type: ACTION_TYPE.SET_LOADING, payload: true });
			setNewTitle(currentProject.title);
			setNewDescription(currentProject.description);
			dispatch({ type: ACTION_TYPE.SET_LOADING, payload: false });
		}
	}, []);

	const saveEdit = async () => {
		try {
			dispatch({ type: ACTION_TYPE.SET_LOADING, payload: true });
			await dispatch(
				updateProjectAsync(currentProject.id, newTitle, newDescription),
			);
			await dispatch(fetchcurrentProject(currentProject.id));
			setIsEditing(false);
		} catch (error) {
			console.error('Ошибка при обновлении проекта:', error);
			alert('Не удалось сохранить изменения. Попробуйте позже.');
		} finally {
			dispatch({ type: ACTION_TYPE.SET_LOADING, payload: false });
		}
	};

	const onCancel = () => {
		setIsEditing(!isEditing);
		navigate(`/projects/${currentProject.id}`);
	};

	return (
		<>
			<div className="w-full flex flex-col">
				{isLoading && <Loader />}
				<Form
					title={newTitle}
					description={newDescription}
					onTitleChange={setNewTitle}
					onDescriptionChange={setNewDescription}
					onSubmit={saveEdit}
					onCancel={onCancel}
					titleLabel="Название проекта"
					descriptionLabel="Описание проекта"
					titlePlaceholder="Введите название проекта"
					descriptionPlaceholder="Введите описание проекта"
					setIsEditing={setIsEditing}
					isEditing={isEditing}
				/>
			</div>
		</>
	);
};

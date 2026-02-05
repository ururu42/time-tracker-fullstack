import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GoBackButton } from '../../../../components';
import { useState } from 'react';
import { addProjectAsync } from '../../../../action';
import { Form } from '../../../../components';

export const AddProjectForm = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [newTitle, setNewTitle] = useState('');
	const [newDescription, setNewDescription] = useState('');

	const handleSubmit = () => {
		dispatch(addProjectAsync(newTitle, newDescription));
		navigate('/projects');
	};
	return (
		<div className="">
			<GoBackButton onClick={() => navigate(-1)} />
			<Form
				title={newTitle}
				description={newDescription}
				onTitleChange={setNewTitle}
				onDescriptionChange={setNewDescription}
				onSubmit={handleSubmit}
				onCancel={() => navigate(-1)}
				titleLabel="Название проекта"
				descriptionLabel="Описание проекта"
				titlePlaceholder="Введите название проекта"
				descriptionPlaceholder="Введите описание проекта"
			/>
		</div>
	);
};

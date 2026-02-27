import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form } from '../../../../../../../../components';
import { addTaskAsync, fetchcurrentProject } from '../../../../../../../../action';

export const AddTaskForm = ({ project, setIsAddTask }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [newTitle, setNewTitle] = useState('');
	const [newDescription, setNewDescription] = useState('');

	const handleSubmit = () => {
		dispatch(
			addTaskAsync({
				title: newTitle,
				description: newDescription,
				projectId: project.id,
			}),
		);
		dispatch(fetchcurrentProject(project.id));
		setIsAddTask(false);
		navigate(`/projects/${project.id}`);
	};

	return (
		<div>
			<Form
				title={newTitle}
				description={newDescription}
				onTitleChange={setNewTitle}
				onDescriptionChange={setNewDescription}
				onSubmit={handleSubmit}
				onCancel={() => setIsAddTask(false)}
				titleLabel="Название задачи"
				descriptionLabel="Описание задачи"
				titlePlaceholder="Введите название задачи"
				descriptionPlaceholder="Введите описание задачи"
			/>
		</div>
	);
};

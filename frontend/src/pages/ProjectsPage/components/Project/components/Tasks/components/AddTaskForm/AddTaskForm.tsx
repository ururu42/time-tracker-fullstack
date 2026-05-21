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
	const [isSaving, setIsSaving] = useState(false);

	const handleSubmit = async () => {
		if (!newTitle.trim()) {
			alert('Введите название задачи');
			return;
		}

		try {
			setIsSaving(true);
			await dispatch(
				addTaskAsync({
					title: newTitle,
					description: newDescription,
					projectId: project.id,
				}),
			);

			await dispatch(fetchcurrentProject(project.id));

			setIsAddTask(false);
			navigate(`/projects/${project.id}`);
		} catch (error) {
			console.error('Ошибка при создании задачи:', error);
			alert('Не удалось сохранить задачу. Попробуйте еще раз.');
		} finally {
			setIsSaving(false);
		}
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
				isLoading={isSaving}
				disabled={isSaving}
			/>
		</div>
	);
};

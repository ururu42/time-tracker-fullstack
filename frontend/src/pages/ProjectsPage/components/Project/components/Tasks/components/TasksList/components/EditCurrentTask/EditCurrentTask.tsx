import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form } from '../../../../../../../../../../components';
import { updateTaskAsync } from '../../../../../../../../../../action';
import { selectCurrentProject } from '../../../../../../../../../../selectors';

export const EditCurrentTask = ({ currentTask }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const currentProject = useSelector(selectCurrentProject);

	const [newTitle, setNewTitle] = useState('');
	const [newDescription, setNewDescription] = useState('');

	useEffect(() => {
		if (currentTask) {
			setNewTitle(currentTask.title);
			setNewDescription(currentTask.description);
		}
	}, []);

	const saveEdit = () => {
		dispatch(updateTaskAsync(currentTask.id, newTitle, newDescription));
		navigate(`/projects/${currentProject.id}`);
	};

	return (
		<>
			<div className="w-full flex flex-col">
				<Form
					title={newTitle}
					description={newDescription}
					onTitleChange={setNewTitle}
					onDescriptionChange={setNewDescription}
					onSubmit={saveEdit}
					onCancel={() => navigate(-1)}
					titleLabel="Название задачи"
					descriptionLabel="Описание задачи"
					titlePlaceholder="Введите название задачи"
					descriptionPlaceholder="Введите описание задачи"
				/>
			</div>
		</>
	);
};

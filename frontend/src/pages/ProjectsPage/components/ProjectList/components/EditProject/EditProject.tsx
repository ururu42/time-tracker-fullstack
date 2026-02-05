import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectProjectWithTasks } from '../../../../../../selectors';
import { Form } from '../../../../../../components';
import { updateProjectAsync } from '../../../../../../action/update-project-async';

export const EditProject = () => {
	const projectWithTasks = useSelector(selectProjectWithTasks);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	console.log(projectWithTasks._id);

	const [newTitle, setNewTitle] = useState('');
	const [newDescription, setNewDescription] = useState('');

	useEffect(() => {
		if (projectWithTasks) {
			setNewTitle(projectWithTasks.title);
			setNewDescription(projectWithTasks.description);
		}
	}, []);

	const saveEdit = () => {
		dispatch(updateProjectAsync(projectWithTasks._id, newTitle, newDescription));
		navigate(`/projects/${projectWithTasks._id}`);
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
					titleLabel="Название проекта"
					descriptionLabel="Описание проекта"
					titlePlaceholder="Введите название проекта"
					descriptionPlaceholder="Введите описание проекта"
				/>
			</div>
		</>
	);
};

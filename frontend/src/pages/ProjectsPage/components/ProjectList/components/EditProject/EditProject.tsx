import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCurrentProject } from '../../../../../../selectors';
import { Form } from '../../../../../../components';
import { updateProjectAsync } from '../../../../../../action/update-project-async';

export const EditProject = () => {
	const currentProject = useSelector(selectCurrentProject);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	console.log(currentProject.id);

	const [newTitle, setNewTitle] = useState('');
	const [newDescription, setNewDescription] = useState('');

	useEffect(() => {
		if (currentProject) {
			setNewTitle(currentProject.title);
			setNewDescription(currentProject.description);
		}
	}, []);

	const saveEdit = () => {
		dispatch(updateProjectAsync(currentProject.id, newTitle, newDescription));
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
					titleLabel="Название проекта"
					descriptionLabel="Описание проекта"
					titlePlaceholder="Введите название проекта"
					descriptionPlaceholder="Введите описание проекта"
				/>
			</div>
		</>
	);
};

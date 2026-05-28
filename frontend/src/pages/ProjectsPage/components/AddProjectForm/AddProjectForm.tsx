import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addProjectAsync } from '../../../../action';
import { Form } from '../../../../components';

interface AddProjectFormProps {
	setIsAddProject: (val: boolean) => void;
	isAddProject: boolean;
	setDropDownDisableb?: (val: boolean) => void;
	dropDownDisabled?: boolean;
	setSelectedProject?: (id: any) => void;
}

export const AddProjectForm = ({
	setIsAddProject,
	isAddProject,
	setDropDownDisableb,
	dropDownDisabled,
	setSelectedProject,
}: AddProjectFormProps) => {
	const dispatch = useDispatch();

	const [newTitle, setNewTitle] = useState('');
	const [newDescription, setNewDescription] = useState('');

	const handleSubmit = async () => {
		const newProject = await dispatch(addProjectAsync(newTitle, newDescription));
		if (newProject) {
			if (setSelectedProject) {
				setSelectedProject(newProject.id);
			}
		}
		if (setDropDownDisableb && dropDownDisabled !== undefined) {
			setDropDownDisableb(!dropDownDisabled);
		}
		setNewTitle('');
		setNewDescription('');
		setIsAddProject(false);
	};

	const onCancel = () => {
		setNewTitle('');
		setNewDescription('');
		if (setDropDownDisableb && dropDownDisabled !== undefined) {
			setDropDownDisableb(!dropDownDisabled);
		}
		setIsAddProject(false);
	};
	return (
		<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
			<Form
				title={newTitle}
				description={newDescription}
				onTitleChange={setNewTitle}
				onDescriptionChange={setNewDescription}
				onSubmit={handleSubmit}
				onCancel={onCancel}
				titleLabel="Название проекта"
				descriptionLabel="Описание проекта"
				titlePlaceholder="Введите название проекта"
				descriptionPlaceholder="Введите описание проекта"
			/>
		</div>
	);
};

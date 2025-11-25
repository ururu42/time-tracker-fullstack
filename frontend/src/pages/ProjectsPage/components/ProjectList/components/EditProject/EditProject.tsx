import { useDispatch } from 'react-redux';
import { Input, Button } from '../../../../../../components';
import { updateProjectAsync } from '../../../../../../action/update-project-async';

export const EditProject = ({ project, setEditingProjectId, setEditForm, editForm }) => {
	const dispatch = useDispatch();

	const handleInputChange = ({ target }) => {
		console.log(target.name, target.value);
		const { name, value } = target;

		setEditForm((prev) => {
			return {
				...prev,
				[name]: value,
			};
		});
	};

	const saveEdit = (projectId) => {
		dispatch(updateProjectAsync(projectId, editForm));
		setEditingProjectId(null);
	};

	const cancelEdit = () => {
		setEditingProjectId(null);
	};

	return (
		<>
			<div className="w-full flex flex-col">
				<Input
					className="w-full font-semibold text-xl text-gray-700 mb-2"
					type="text"
					name="title"
					value={editForm.title}
					onChange={handleInputChange}
				/>

				<textarea
					className="text-base text-gray-500 border border-gray-400 p-4 rounded"
					name="description"
					value={editForm.description}
					onChange={handleInputChange}
				/>
				<div className="flex justify-between">
					<Button
						className="mt-2.5 w-32 bg-green-600 hover:bg-green-700"
						onClick={() => saveEdit(project._id)}
					>
						Save
					</Button>
					<Button
						className="mt-2.5 w-32 bg-red-500 hover:bg-red-600 "
						onClick={cancelEdit}
					>
						Cancel
					</Button>
				</div>
			</div>
		</>
	);
};

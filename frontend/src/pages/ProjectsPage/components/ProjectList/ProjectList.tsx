import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { removeProjectAsync } from '../../../../action';
import { EditProject } from './components';
import { Icon } from '@iconify/react';

export const ProjectList = ({ projects }) => {
	const dispatch = useDispatch();
	const [editingProjectId, setEditingProjectId] = useState(null);
	const [editForm, setEditForm] = useState({ title: '', description: '' });

	const onProjectRemove = (projectId) => {
		dispatch(removeProjectAsync(projectId));
	};
	const onProjectEdit = (project) => {
		setEditingProjectId(project._id);
		setEditForm({ title: project.title, description: project.description });
	};

	return (
		<div className="flex flex-col">
			{projects && projects.length > 0 ? (
				projects.map((project) => (
					<div
						className="flex justify-between items-center p-6 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
						key={project.id}
					>
						{' '}
						{editingProjectId === project._id ? (
							<EditProject
								project={project}
								setEditingProjectId={setEditingProjectId}
								setEditForm={setEditForm}
								editForm={editForm}
							/>
						) : (
							<>
								<div className="flex flex-col">
									<h3 className="font-semibold text-xl text-gray-700 mb-2">
										{project.title}
									</h3>
									<p className="text-base text-gray-500">
										{project.description}
									</p>
								</div>
								<div className="flex">
									<Icon
										icon="mdi:edit"
										className="w-8 h-8 text-gray-600 hover:text-gray-700"
										onClick={() => onProjectEdit(project)}
									></Icon>
									<Icon
										icon="mdi:delete-forever"
										className="w-8 h-8 text-red-600 hover:text-red-700 ml-4"
										onClick={() => onProjectRemove(project._id)}
									></Icon>
								</div>
							</>
						)}
					</div>
				))
			) : (
				<p>No projects found</p>
			)}
		</div>
	);
};

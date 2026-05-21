import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTasksByProject } from '../../../../../../../../selectors';
import { EditCurrentTask } from './components/EditCurrentTask/EditCurrentTask';
import { TasksView } from './components/TasksView/TasksView';
import { CommentListForTask } from './components/CommentListForTask/CommentListForTask';

export const TasksList = ({ project }) => {
	const [editTitle, setEditTitle] = useState('');
	const [editDescription, setEditDescription] = useState('');
	const [editingTaskId, setEditingTaskId] = useState(null);
	const [editStatus, setEditStatus] = useState('');
	const [editPriority, setEditPriority] = useState('');

	const tasksByProject = useSelector((state) =>
		selectTasksByProject(state, project.id),
	);

	return (
		<div>
			{tasksByProject && tasksByProject.length > 0 ? (
				<div className="space-y-4">
					{tasksByProject.map((task) => (
						<div
							key={task.id}
							className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
						>
							{editingTaskId === task.id ? (
								<EditCurrentTask
									editTitle={editTitle}
									setEditTitle={setEditTitle}
									editDescription={editDescription}
									setEditDescription={setEditDescription}
									editingTaskId={editingTaskId}
									setEditingTaskId={setEditingTaskId}
									editStatus={editStatus}
									setEditStatus={setEditStatus}
									editPriority={editPriority}
									setEditPriority={setEditPriority}
								/>
							) : (
								<>
									<TasksView
										task={task}
										setEditingTaskId={setEditingTaskId}
										setEditTitle={setEditTitle}
										setEditDescription={setEditDescription}
										setEditStatus={setEditStatus}
										setEditPriority={setEditPriority}
									/>
									<CommentListForTask
										tasksByProject={tasksByProject}
										task={task}
									/>
								</>
							)}
						</div>
					))}
				</div>
			) : (
				<div className="p-12 text-center bg-gray-50 rounded-lg border border-gray-200">
					<p className="text-gray-500 mb-3">В этом проекте пока нет задач</p>
				</div>
			)}
		</div>
	);
};

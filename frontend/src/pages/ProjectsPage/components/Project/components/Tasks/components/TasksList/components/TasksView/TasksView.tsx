import { useDispatch } from 'react-redux';
import { removeTaskAsync } from '../../../../../../../../../../action';
import { TaskStatus } from './components/TaskStatus/TaskStatus';
import { TaskDate } from './components/TaskDate/TaskDate';
import { Icon } from '@iconify/react';

export const TasksView = ({
	task,
	setEditingTaskId,
	setEditTitle,
	setEditDescription,
	setEditStatus,
	setEditPriority,
}) => {
	const dispatch = useDispatch();

	const onTaskRemove = (taskId) => {
		if (window.confirm('Действительно удалить задачу?')) {
			dispatch(removeTaskAsync(taskId));
		}
	};

	const startEditing = (task) => {
		setEditingTaskId(task.id);
		setEditTitle(task.title);
		setEditDescription(task.description || '');
		setEditStatus(task.status || 'todo');
		setEditPriority(task.priority || 'low');
	};
	return (
		<div className="flex justify-between items-start mb-4">
			<div className="flex-1">
				<h3 className="font-semibold text-lg text-gray-800 mb-2">{task.title}</h3>
				{task.description && (
					<p className="text-gray-600 mb-3">{task.description}</p>
				)}

				<TaskStatus task={task} />
			</div>

			<TaskDate task={task} />

			<div className="flex ml-3">
				<Icon
					icon="mdi:edit"
					className="w-6 h-6 text-gray-600 hover:text-gray-700 cursor-pointer"
					onClick={() => startEditing(task)}
				/>
				<Icon
					icon="mdi:delete-forever"
					className="w-7 h-7 text-red-600 hover:text-red-700 ml-2 cursor-pointer"
					onClick={() => onTaskRemove(task.id)}
				/>
			</div>
		</div>
	);
};

import React from 'react';
import { Task } from '../../../../models/Task';
import { useAppSelector, useAppDispatch } from '../../../../store';
import { deleteTask, updateTask } from '../../../../action';

interface TaskListProps {
	projectId: string;
}

export const TaskList: React.FC<TaskListProps> = ({ projectId }) => {
	const dispatch = useAppDispatch();
	const tasks = useAppSelector((state) =>
		state.tasks.items.filter((task) => task.projectId === projectId),
	);

	const handleDeleteTask = (taskId: string) => {
		if (window.confirm('Are you sure you want to delete this task?')) {
			dispatch(deleteTask(taskId));
		}
	};

	const handleStatusChange = async (taskId: string, newStatus: Task['status']) => {
		const task = tasks.find((t) => t.id === taskId);
		if (task) {
			try {
				await dispatch(updateTask(taskId, { ...task, status: newStatus }));
			} catch (error) {
				console.error('Failed to update task:', error);
			}
		}
	};

	return (
		<div className="mt-6">
			<h3 className="text-lg font-medium mb-4">Tasks</h3>
			{tasks.length === 0 ? (
				<p className="text-gray-500">No tasks for this project yet.</p>
			) : (
				<ul className="space-y-2">
					{tasks.map((task) => (
						<li
							key={task.id}
							className="p-3 border rounded-lg flex justify-between items-center bg-white"
						>
							<div>
								<h4 className="font-medium">{task.title}</h4>
								<p className="text-sm text-gray-600">
									{task.description}
								</p>
								<div className="flex items-center mt-1">
									<span
										className={`inline-block w-3 h-3 rounded-full mr-2 ${
											task.status === 'todo'
												? 'bg-gray-400'
												: task.status === 'in-progress'
													? 'bg-yellow-400'
													: 'bg-green-400'
										}`}
									></span>
									<span className="text-xs capitalize">
										{task.status}
									</span>
								</div>
							</div>
							<div className="flex space-x-2">
								<select
									value={task.status}
									onChange={(e) =>
										handleStatusChange(
											task.id,
											e.target.value as Task['status'],
										)
									}
									className="text-sm border rounded px-2 py-1"
								>
									<option value="todo">To Do</option>
									<option value="in-progress">In Progress</option>
									<option value="done">Done</option>
								</select>
								<button
									onClick={() => handleDeleteTask(task.id)}
									className="text-red-500 hover:text-red-70 text-sm"
								>
									Delete
								</button>
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

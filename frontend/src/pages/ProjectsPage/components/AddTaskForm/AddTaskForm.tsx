import React, { useState } from 'react';
import { useAppDispatch } from '../../../../store';
import { addTask } from '../../../../action';
import { Task } from '../../../../models/Task';

interface AddTaskFormProps {
	projectId: string;
	onTaskAdded?: () => void;
}

export const AddTaskForm: React.FC<AddTaskFormProps> = ({ projectId, onTaskAdded }) => {
	const dispatch = useAppDispatch();
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [status, setStatus] = useState<Task['status']>('todo');
	const [priority, setPriority] = useState<Task['priority']>('medium');
	const [error, setError] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!title.trim()) {
			setError('Task title is required');
			return;
		}

		try {
			await dispatch(
				addTask({
					projectId,
					title: title.trim(),
					description,
					status,
					priority,
					isArchived: false,
				}),
			);

			setTitle('');
			setDescription('');
			setStatus('todo');
			setPriority('medium');
			setError('');

			if (onTaskAdded) {
				onTaskAdded();
			}
		} catch (err) {
			setError('Failed to create task');
			console.error('Failed to create task:', err);
		}
	};

	return (
		<div className="mt-6">
			<h3 className="text-lg font-medium mb-4">Add New Task</h3>
			<form onSubmit={handleSubmit} className="space-y-4">
				{error && <div className="text-red-500 text-sm">{error}</div>}

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Title *
					</label>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Enter task title"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Description
					</label>
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Enter task description"
						rows={3}
					/>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium text-gray-70 mb-1">
							Status
						</label>
						<select
							value={status}
							onChange={(e) => setStatus(e.target.value as Task['status'])}
							className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							<option value="todo">To Do</option>
							<option value="in-progress">In Progress</option>
							<option value="done">Done</option>
						</select>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Priority
						</label>
						<select
							value={priority}
							onChange={(e) =>
								setPriority(e.target.value as Task['priority'])
							}
							className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							<option value="low">Low</option>
							<option value="medium">Medium</option>
							<option value="high">High</option>
						</select>
					</div>
				</div>

				<button
					type="submit"
					className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
				>
					Add Task
				</button>
			</form>
		</div>
	);
};

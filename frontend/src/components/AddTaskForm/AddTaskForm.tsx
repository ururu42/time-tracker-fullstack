import { useState } from 'react';
import { Icon } from '@iconify/react';

export const AddTaskForm = ({ isAddingTask, setIsAddingTask, onAddTask, disabled }) => {
	const [newTaskTitle, setNewTaskTitle] = useState('');

	const handleSave = () => {
		if (!newTaskTitle.trim()) return;
		onAddTask(newTaskTitle);
		setNewTaskTitle('');
		setIsAddingTask(false);
	};

	const handleCancel = () => {
		setNewTaskTitle('');
		setIsAddingTask(false);
	};

	if (disabled) return null;

	if (!isAddingTask) {
		return (
			<button
				className="flex items-center justify-center bg-white rounded-full mb-2"
				onClick={() => setIsAddingTask(true)}
			>
				<Icon
					icon="solar:add-circle-bold"
					className="text-emerald-600 w-5 h-5 mr-1.5"
				/>
				<span className="text-sm font-medium text-gray-700 whitespace-nowrap">
					Добавить задачу
				</span>
			</button>
		);
	}

	return (
		<div className="mb-4 space-y-3">
			<input
				type="text"
				value={newTaskTitle}
				onChange={(e) => setNewTaskTitle(e.target.value)}
				placeholder="Введите название новой задачи..."
				className="w-full border rounded-lg bg-white border-gray-200 pl-4 pr-10 py-2.5 focus:ring-2 focus:ring-green-500 outline-none transition-all text-gray-700"
			/>
			<div className="flex gap-2">
				<button
					disabled={!newTaskTitle.trim()}
					onClick={handleSave}
					className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-sm ${
						!newTaskTitle.trim()
							? 'bg-gray-200 text-gray-400 cursor-not-allowed'
							: 'bg-green-600 text-white hover:bg-green-700 hover:shadow-md'
					}`}
				>
					Сохранить
				</button>
				<button
					onClick={handleCancel}
					className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 bg-red-100 text-red-700 hover:bg-red-200 hover:shadow-sm"
				>
					Отменить
				</button>
			</div>
		</div>
	);
};

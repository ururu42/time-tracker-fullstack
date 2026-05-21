import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTaskAsync } from '../../../../../../../../../../action';
import { Button } from '../../../../../../../../../../components';

export const EditCurrentTask = ({
	editTitle,
	setEditTitle,
	editDescription,
	setEditDescription,
	editingTaskId,
	setEditingTaskId,
	editStatus,
	setEditStatus,
	editPriority,
	setEditPriority,
}) => {
	const dispatch = useDispatch();

	const cancelEditing = () => {
		setEditingTaskId(null);
		setEditTitle('');
		setEditDescription('');
		setEditStatus('');
		setEditPriority('');
	};

	const saveEditing = () => {
		if (editTitle.trim()) {
			dispatch(
				updateTaskAsync(editingTaskId, {
					title: editTitle,
					description: editDescription,
					status: editStatus,
					priority: editPriority,
				}),
			);
			cancelEditing();
		}
	};
	return (
		<div className="space-y-4">
			<div>
				<label className="block text-sm font-medium text-gray-700 mb-1">
					Название задачи
				</label>
				<input
					type="text"
					value={editTitle}
					onChange={(e) => setEditTitle(e.target.value)}
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					placeholder="Введите название задачи"
				/>
			</div>
			<div>
				<label className="block text-sm font-medium text-gray-700 mb-1">
					Описание
				</label>
				<textarea
					value={editDescription}
					onChange={(e) => setEditDescription(e.target.value)}
					className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					placeholder="Введите описание задачи"
					rows={3}
				/>
			</div>
			<div className="flex gap-4">
				<label className="block text-sm font-medium text-gray-700 mb-1">
					Статус задачи
				</label>
				<Button
					className={`!px-2 !py-1 text-xs rounded-full ${editStatus === 'todo' ? 'bg-yellow-200 text-yellow-800 hover:bg-yellow-200 ring-2 ring-yellow-600' : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'}`}
					onClick={() => setEditStatus('todo')}
				>
					Новая
				</Button>
				<Button
					className={`!px-2 !py-1 text-xs rounded-full ${editStatus === 'in-progress' ? 'bg-yellow-200 text-yellow-800 hover:bg-yellow-200 ring-2 ring-yellow-600' : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'}`}
					onClick={() => setEditStatus('in-progress')}
				>
					В процессе
				</Button>
				<Button
					className={`!px-2 !py-1 text-xs rounded-full ${editStatus === 'completed' ? 'bg-yellow-200 text-yellow-800 hover:bg-yellow-200 ring-2 ring-yellow-600' : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'}`}
					onClick={() => setEditStatus('completed')}
				>
					Завершена
				</Button>
			</div>
			<div className="flex gap-4">
				<label className="block text-sm font-medium text-gray-700 mb-1">
					Приоритет
				</label>
				<Button
					className={`!px-2 !py-1 text-xs rounded-full ${editPriority === 'high' ? 'bg-yellow-200 text-yellow-800 hover:bg-yellow-200 ring-2 ring-yellow-600' : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'}`}
					onClick={() => setEditPriority('high')}
				>
					Высокий
				</Button>
				<Button
					className={`!px-2 !py-1 text-xs rounded-full ${editPriority === 'medium' ? 'bg-yellow-200 text-yellow-800 hover:bg-yellow-200 ring-2 ring-yellow-600' : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'}`}
					onClick={() => setEditPriority('medium')}
				>
					Средний
				</Button>
				<Button
					className={`!px-2 !py-1 text-xs rounded-full ${editPriority === 'low' ? 'bg-yellow-200 text-yellow-800 hover:bg-yellow-200 ring-2 ring-yellow-600' : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'}`}
					onClick={() => setEditPriority('low')}
				>
					Низкий
				</Button>
			</div>
			<div className="flex gap-2">
				<Button
					onClick={saveEditing}
					className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition-colors"
				>
					Сохранить
				</Button>
				<Button
					onClick={cancelEditing}
					className="px-4 py-2 bg-gray-400 text-white hover:bg-gray-500 transition-colors"
				>
					Отмена
				</Button>
			</div>
		</div>
	);
};

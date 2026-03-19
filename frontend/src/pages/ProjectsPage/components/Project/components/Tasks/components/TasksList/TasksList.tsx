import { useDispatch, useSelector } from 'react-redux';
import { selectTasksByProject } from '../../../../../../../../selectors';
import { removeTaskAsync, updateTaskAsync } from '../../../../../../../../action';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { Button } from '../../../../../../../../components';

export const TasksList = ({ project }) => {
	const dispatch = useDispatch();

	// Состояние для отслеживания редактируемой задачи
	const [editingTaskId, setEditingTaskId] = useState(null);
	const [editTitle, setEditTitle] = useState('');
	const [editDescription, setEditDescription] = useState('');
	const [editStatus, setEditStatus] = useState('');
	const [editPriority, setEditPriority] = useState('');

	// Берем задачи текущего проекта из редюсера
	const tasksByProject = useSelector((state) =>
		selectTasksByProject(state, project.id),
	);

	const onTaskRemove = (taskId) => {
		// Можно добавить подтверждение
		if (window.confirm('Действительно удалить задачу?')) {
			dispatch(removeTaskAsync(taskId));
		}
	};

	// Начало редактирования задачи
	const startEditing = (task) => {
		setEditingTaskId(task.id);
		setEditTitle(task.title);
		setEditDescription(task.description || '');
	};

	// Отмена редактирования
	const cancelEditing = () => {
		setEditingTaskId(null);
		setEditTitle('');
		setEditDescription('');
		setEditStatus('');
		setEditPriority('');
	};

	// Сохранение изменений
	const saveEditing = () => {
		if (editTitle.trim()) {
			dispatch(
				updateTaskAsync(
					editingTaskId,
					editTitle,
					editDescription,
					editStatus,
					editPriority,
				),
			);
			cancelEditing();
		}
	};

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
								// Режим редактирования
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
											onChange={(e) =>
												setEditDescription(e.target.value)
											}
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
							) : (
								// Режим просмотра
								<div className="flex justify-between items-start">
									<div className="flex-1">
										<h3 className="font-semibold text-lg text-gray-800 mb-2">
											{task.title}
										</h3>
										{task.description && (
											<p className="text-gray-600 mb-3">
												{task.description}
											</p>
										)}

										<div className="flex flex-wrap gap-2 text-sm">
											<span className="text-gray-700">
												Статус задачи:{' '}
											</span>
											{task.status && (
												<span
													className={`px-3 py-1 rounded-full ${
														task.status === 'completed'
															? 'bg-green-100 text-green-800'
															: task.status ===
																  'in-progress'
																? 'bg-blue-100 text-blue-800'
																: 'bg-yellow-100 text-yellow-800'
													}`}
												>
													{task.status === 'completed'
														? 'Завершена'
														: task.status === 'in-progress'
															? 'В процессе'
															: 'Новая'}
												</span>
											)}

											<span className="text-gray-700">
												Приоритет:{' '}
											</span>
											{task.priority && (
												<span
													className={`px-3 py-1 rounded-full ${
														task.priority === 'high'
															? 'bg-red-100 text-red-800'
															: task.priority === 'medium'
																? 'bg-yellow-100 text-yellow-800'
																: 'bg-green-100 text-green-800'
													}`}
												>
													{task.priority === 'high'
														? 'Высокий'
														: task.priority === 'medium'
															? 'Средний'
															: 'Низкий'}
												</span>
											)}
										</div>
									</div>

									<div className="ml-4 text-right text-sm text-gray-500">
										{task.createdAt && (
											<div>
												Создано:{' '}
												{new Date(
													task.createdAt,
												).toLocaleDateString()}
											</div>
										)}
										{task.updatedAt && (
											<div>
												Обновлено:{' '}
												{new Date(
													task.updatedAt,
												).toLocaleDateString()}
											</div>
										)}
									</div>

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

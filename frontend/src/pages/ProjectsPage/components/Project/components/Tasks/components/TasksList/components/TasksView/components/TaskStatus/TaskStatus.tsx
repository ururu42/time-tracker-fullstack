export const TaskStatus = ({ task }) => {
	return (
		<div className="flex flex-wrap gap-2 text-sm">
			<span className="text-gray-700">Статус задачи: </span>
			{task.status && (
				<span
					className={`px-3 py-1 rounded-full ${
						task.status === 'completed'
							? 'bg-green-100 text-green-800'
							: task.status === 'in-progress'
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

			<span className="text-gray-700">Приоритет: </span>
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
	);
};

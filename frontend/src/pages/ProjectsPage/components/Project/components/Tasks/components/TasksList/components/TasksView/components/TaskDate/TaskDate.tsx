export const TaskDate = ({ task }) => {
	return (
		<div className="ml-4 text-right text-sm text-gray-500">
			{task.createdAt && (
				<div>Создано: {new Date(task.createdAt).toLocaleDateString()}</div>
			)}
			{task.updatedAt && (
				<div>Обновлено: {new Date(task.updatedAt).toLocaleDateString()}</div>
			)}
		</div>
	);
};

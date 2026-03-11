const mongoose = require('mongoose');

module.exports = function mapTask(task) {
	// Проверяем, был ли populate выполнен для projectId
	const hasPopulatedProject = task.projectId && typeof task.projectId === 'object' && task.projectId._id;

	return {
		id: task._id.toString(),
		owner: task.owner.toString(),
		// Преобразуем projectId в строку для консистентности
		projectId: hasPopulatedProject ? task.projectId._id.toString() : task.projectId.toString(),
		title: task.title,
		description: task.description,
		status: task.status,
		priority: task.priority,
		isArchived: task.isArchived,
		createdAt: task.createdAt,
		updatedAt: task.updatedAt,
		// Если populate был выполнен, включаем данные проекта
		...(hasPopulatedProject && {
			project: {
				id: task.projectId._id.toString(),
				title: task.projectId.title,
				description: task.projectId.description,
			}
		})
	};
};
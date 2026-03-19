// frontend/src/selectors/select-tasksByProject.tsx
import { createSelector } from 'reselect';

// Селектор для получения всех задач (возвращаем сам объект tasks)
const selectAllTasks = (state) => state.tasks;

// Селектор для получения projectId
const selectProjectId = (state, projectId) => projectId;

// Мемоизированный селектор
export const selectTasksByProject = createSelector(
	[selectAllTasks, selectProjectId],
	(tasks, projectId) => {
		const result = tasks.allIds
			.map((id) => tasks.byId[id])
			.filter((task) => {
				const match = task && task.projectId === projectId;

				return match;
			});
		return result;
	},
);

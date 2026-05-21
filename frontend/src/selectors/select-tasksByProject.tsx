import { createSelector } from 'reselect';

const selectAllTasks = (state) => state.tasks;

const selectProjectId = (state, projectId) => projectId;

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

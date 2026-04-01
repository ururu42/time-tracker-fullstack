import { createSelector } from 'reselect';

const selectAllTasks = (state) => state.tasks;
const selectTaskId = (state, taskId) => taskId;

export const selectTaskById = createSelector(
	[selectAllTasks, selectTaskId],
	(tasks, taskId) => {
		return tasks.byId[taskId] || null;
	},
);

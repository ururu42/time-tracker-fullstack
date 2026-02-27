import { ACTION_TYPE } from './action-type';

export const fetchTasksForProject = (projectId) => {
	return async (dispatch) => {
		try {
			const response = await fetch(`/api/tasks?projectId=${projectId}`, {
				method: 'GET',
				credentials: 'include',
			});

			if (!response.ok) {
				throw new Error('Failed to fetch tasks');
			}

			const result = await response.json();

			const tasksPayload = Array.isArray(result) ? result : (result?.data ?? []);

			dispatch({
				type: ACTION_TYPE.SET_TASKS,
				payload: tasksPayload,
			});
		} catch (error) {
			console.error('Error fetching tasks:', error);

			// опционально — можно задиспатчить ошибку
			// dispatch({ type: ACTION_TYPE.SET_TASKS_ERROR, payload: error.message });
		}
	};
};

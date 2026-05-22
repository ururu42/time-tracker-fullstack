import { ACTION_TYPE } from './action-type';
import { API_URL } from '../config';

export const fetchTasksForProject = (projectId) => {
	return async (dispatch) => {
		try {
			const response = await fetch(`${API_URL}/api/tasks?projectId=${projectId}`, {
				method: 'GET',
				credentials: 'include',
			});

			if (!response.ok) {
				throw new Error('Failed to fetch tasks');
			}

			const result = await response.json();
			// console.log('Result from server:', result);

			const tasksPayload = Array.isArray(result) ? result : (result?.data ?? []);

			dispatch({
				type: ACTION_TYPE.SET_TASKS,
				payload: tasksPayload,
			});
		} catch (error) {
			console.error('Error fetching tasks:', error);
		} finally {
			dispatch({ type: ACTION_TYPE.SET_LOADING, payload: false });
		}
	};
};

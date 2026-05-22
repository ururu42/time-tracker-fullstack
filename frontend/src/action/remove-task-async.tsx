import { ACTION_TYPE } from './action-type';
import { API_URL } from '../config';

export const removeTaskAsync = (taskId) => {
	return async (dispatch) => {
		try {
			const response = await fetch(`${API_URL}/api/tasks/${taskId}`, {
				method: 'DELETE',
				credentials: 'include',
			});
			const result = await response.json();

			dispatch({ type: ACTION_TYPE.DELETE_TASK, payload: taskId });
		} catch (e) {
			console.error('Server error', e);
		}
	};
};

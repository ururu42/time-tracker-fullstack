import { ACTION_TYPE } from './action-type';

export const removeTaskAsync = (taskId) => {
	return async (dispatch) => {
		try {
			const response = await fetch(`/api/tasks/${taskId}`, {
				method: 'DELETE',
				credentials: 'include',
			});
			const result = await response.json();
			console.log(result);
			dispatch({ type: ACTION_TYPE.DELETE_TASK, payload: taskId });
		} catch (e) {
			console.error('Server error', e);
		}
	};
};

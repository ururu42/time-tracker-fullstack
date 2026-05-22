import { ACTION_TYPE } from './action-type';
import { API_URL } from '../config';

export const removeProjectAsync = (projectId) => {
	return async (dispatch) => {
		try {
			const response = await fetch(`${API_URL}/api/project/${projectId}`, {
				method: 'DELETE',
				credentials: 'include',
			});
			const result = await response.json();
			dispatch({ type: ACTION_TYPE.DELETE_PROJECT, payload: projectId });
		} catch (e) {
			console.error('Server error', e);
		} finally {
			dispatch({ type: ACTION_TYPE.SET_LOADING, payload: false });
		}
	};
};

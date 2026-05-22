import { ACTION_TYPE } from './action-type';
import { API_URL } from '../config';

export const removeTimeEntriesAsync = (commentId) => {
	return async (dispatch) => {
		try {
			const response = await fetch(`${API_URL}/api/time/${commentId}`, {
				method: 'DELETE',
				credentials: 'include',
			});

			dispatch({ type: ACTION_TYPE.DELETE_TIME_ENTRY, payload: commentId });
		} catch (e) {
			console.error('Server error', e);
		}
	};
};

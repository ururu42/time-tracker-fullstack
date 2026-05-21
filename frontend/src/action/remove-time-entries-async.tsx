import { ACTION_TYPE } from './action-type';

export const removeTimeEntriesAsync = (commentId) => {
	return async (dispatch) => {
		try {
			const response = await fetch(`/api/time/${commentId}`, {
				method: 'DELETE',
				credentials: 'include',
			});
			const result = await response.json();

			dispatch({ type: ACTION_TYPE.DELETE_TIME_ENTRY, payload: commentId });
		} catch (e) {
			console.error('Server error', e);
		}
	};
};

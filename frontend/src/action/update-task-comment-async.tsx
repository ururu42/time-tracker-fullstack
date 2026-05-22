import { ACTION_TYPE } from './action-type';
import { API_URL } from '../config';

export const updateTaskCommentAsync = (commentId, comment) => {
	return async (dispatch) => {
		try {
			const response = await fetch(`${API_URL}/api/time/${commentId}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
				credentials: 'include',
				body: JSON.stringify({
					comment: comment,
				}),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const updatedComment = await response.json();

			dispatch({
				type: ACTION_TYPE.UPDATE_TIME_ENTRY,
				payload: updatedComment.data,
			});
		} catch (e) {
			console.error('Server error', e);
		}
	};
};

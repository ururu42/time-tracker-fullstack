import { ACTION_TYPE } from './action-type';

export const updateTaskCommentAsync = (commentId, comment) => {
	return async (dispatch) => {
		try {
			const response = await fetch(`/api/time/${commentId}`, {
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
			// console.log('Комментарий обновлен, ответ от сервера:', updatedComment);
			dispatch({
				type: ACTION_TYPE.UPDATE_TIME_ENTRY,
				payload: updatedComment.data,
			});
		} catch (e) {
			console.error('Server error', e);
		}
	};
};

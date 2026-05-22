import { ACTION_TYPE } from './action-type';
import { API_URL } from '../config';

export const updateUserAsync = (userId, editForm) => {
	const { login, name } = editForm;
	return async (dispatch) => {
		try {
			const response = await fetch(`${API_URL}/api/user/me`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
				credentials: 'include',
				body: JSON.stringify({
					login: login,
					name: name,
				}),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const updateUser = await response.json();

			dispatch({ type: ACTION_TYPE.UPDATE_USER, payload: updateUser.data });
		} catch (e) {
			console.error('Server error', e);
		}
	};
};

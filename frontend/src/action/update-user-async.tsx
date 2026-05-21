import { ACTION_TYPE } from './action-type';

export const updateUserAsync = (userId, editForm) => {
	const { login, name } = editForm;
	return async (dispatch) => {
		try {
			const response = await fetch(`/api/user/me`, {
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
			// console.log('Задача обновлена, ответ от сервера:', updateUser);
			dispatch({ type: ACTION_TYPE.UPDATE_USER, payload: updateUser.data });
		} catch (e) {
			console.error('Server error', e);
		}
	};
};

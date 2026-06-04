import { ACTION_TYPE } from './action-type';
import { API_URL } from '../config';

export const logout = () => {
	fetch(`${API_URL}/api/auth/logout`, {
		method: 'POST',
		credentials: 'include',
	});

	return { type: ACTION_TYPE.LOGOUT };
};

import { ACTION_TYPE } from './action-type';

export const logout = () => {
	fetch('/api/auth/logout', { method: 'POST' });

	return { type: ACTION_TYPE.LOGOUT };
};

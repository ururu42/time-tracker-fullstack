import { ACTION_TYPE } from './action-type';

export const logout = () => {
	fetch('/api/logout', { method: 'POST' });

	return { type: ACTION_TYPE.LOGOUT };
};

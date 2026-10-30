import { ACTION_TYPE } from './action-type';
import { API_URL } from '../config';

const TIMER_API_URL = `${API_URL}/api/timer`;

const parseJson = (response) => response.json().catch(() => null);

export const startTimerSessionAsync = ({ taskId, comment }) => {
	return async () => {
		try {
			const response = await fetch(`${TIMER_API_URL}/start`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
				credentials: 'include',
				body: JSON.stringify({ taskId, comment }),
			});

			const result = await parseJson(response);

			if (response.status === 409) {
				return { status: 'ALREADY_RUNNING' };
			}

			if (!response.ok) {
				throw new Error(result?.error || `HTTP error! status: ${response.status}`);
			}

			return {
				status: 'OK',
				session: result?.data?.session,
				serverTime: result?.data?.serverTime,
			};
		} catch (e) {
			console.error('Timer start error', e);
			return { status: 'ERROR' };
		}
	};
};

export const fetchActiveTimerAsync = () => {
	return async () => {
		try {
			const response = await fetch(`${TIMER_API_URL}/current`, {
				method: 'GET',
				credentials: 'include',
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const result = await parseJson(response);
			return result?.data || { session: null, serverTime: new Date().toISOString() };
		} catch (e) {
			console.error('Timer fetch error', e);
			return null;
		}
	};
};

export const finishTimerSessionAsync = ({ comment } = {}) => {
	return async (dispatch) => {
		try {
			const response = await fetch(`${TIMER_API_URL}/finish`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
				credentials: 'include',
				body: JSON.stringify({ comment }),
			});

			const result = await parseJson(response);

			if (!response.ok) {
				throw new Error(result?.error || `HTTP error! status: ${response.status}`);
			}

			const entry = result?.data;
			if (entry) {
				dispatch({ type: ACTION_TYPE.ADD_TIME_ENTRY, payload: entry });
			}

			return entry;
		} catch (e) {
			console.error('Timer finish error', e);
			return null;
		}
	};
};

export const cancelTimerSessionAsync = () => {
	return async () => {
		try {
			const response = await fetch(`${TIMER_API_URL}/current`, {
				method: 'DELETE',
				credentials: 'include',
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			return true;
		} catch (e) {
			console.error('Timer cancel error', e);
			return false;
		}
	};
};

export const updateTimerSessionCommentAsync = ({ comment }) => {
	return async () => {
		try {
			const response = await fetch(`${TIMER_API_URL}/current`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
				credentials: 'include',
				body: JSON.stringify({ comment }),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			return true;
		} catch (e) {
			console.error('Timer comment error', e);
			return false;
		}
	};
};
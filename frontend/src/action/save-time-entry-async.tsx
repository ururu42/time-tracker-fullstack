import { ACTION_TYPE } from './action-type';
import { API_URL } from '../config';

export const saveTimeEntryAsync = ({ taskId, startTime, endTime, duration, comment }) => {
	return async (dispatch) => {
		try {
			const response = await fetch(`${API_URL}/api/time`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
				credentials: 'include',
				body: JSON.stringify({
					taskId: taskId,
					startTime: startTime,
					endTime: endTime,
					duration: duration,
					comment: comment,
				}),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const savedTime = await response.json();

			dispatch({ type: ACTION_TYPE.ADD_TIME_ENTRY, payload: savedTime.data });
		} catch (e) {
			console.error('Server error', e);
		} finally {
			dispatch({ type: ACTION_TYPE.SET_LOADING, payload: false });
		}
	};
};

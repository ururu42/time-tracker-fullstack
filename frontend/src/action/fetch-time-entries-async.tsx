import { ACTION_TYPE } from './action-type';
import { API_URL } from '../config';

export const fetchTimeEntriesAsync = () => {
	return async (dispatch) => {
		try {
			const response = await fetch(`${API_URL}/api/time`, {
				method: 'GET',
				credentials: 'include',
			});

			if (!response.ok) {
				throw new Error('Failed to fetch tasks');
			}

			const allTimeEntries = await response.json();

			dispatch({
				type: ACTION_TYPE.SET_TIME_ENTRIES,
				payload: allTimeEntries.data,
			});
		} catch (error) {
			console.error('Error fetching tasks:', error);

			// опционально — можно задиспатчить ошибку
			// dispatch({ type: ACTION_TYPE.SET_TASKS_ERROR, payload: error.message });
		} finally {
			dispatch({ type: ACTION_TYPE.SET_LOADING, payload: false });
		}
	};
};

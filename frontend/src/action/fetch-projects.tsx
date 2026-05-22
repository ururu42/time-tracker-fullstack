import { ACTION_TYPE } from './action-type';
import { API_URL } from '../config';

export const fetchProjects = (page = 1, limit = 5, search = '') => {
	return async (dispatch) => {
		try {
			const response = await fetch(
				`${API_URL}/api/project?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`,
				{
					method: 'GET',
					credentials: 'include',
				},
			);

			if (!response.ok) {
				throw new Error('Failed to fetch projects');
			}

			const result = await response.json();

			dispatch({ type: ACTION_TYPE.SET_PROJECTS, payload: result.data });
			return result.lastPage;
		} catch (e) {
			console.error('Error fetching projects:', e);
		}
	};
};

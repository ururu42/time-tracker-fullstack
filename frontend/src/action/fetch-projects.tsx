import { ACTION_TYPE } from './action-type';

export const fetchProjects = (page = 1, limit = 5, search = '') => {
	return async (dispatch) => {
		try {
			const response = await fetch(
				`/api/project?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`,
				{
					method: 'GET',
					credentials: 'include',
				},
			);

			if (!response.ok) {
				throw new Error('Failed to fetch projects');
			}

			const result = await response.json();

			dispatch({ type: ACTION_TYPE.SET_PROJECTS, payload: result.projects });
			return result.lastPage;
		} catch (e) {
			console.error('Error fetching projects:', e);
		}
	};
};

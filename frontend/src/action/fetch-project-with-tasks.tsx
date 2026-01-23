import { ACTION_TYPE } from './action-type';

export const fetchProjectWithTasks = (projectId) => {
	return async (dispatch) => {
		try {
			const res = await fetch(`/api/project/${projectId}`, {
				method: 'GET',
				credentials: 'include',
			});

			if (!res.ok) {
				throw new Error('Failed to fetch project');
			}

			const result = await res.json();

			dispatch({ type: ACTION_TYPE.SET_CURRENT_PROJECT, payload: result.data });
		} catch (e) {
			console.error('Error fetching project:', e);
		}
	};
};

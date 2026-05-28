import { ACTION_TYPE } from './action-type';
import { API_URL } from '../config';

export const addProjectAsync = (newTitle, newDescription) => {
	return async (dispatch) => {
		try {
			const response = await fetch(`${API_URL}/api/project`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
				credentials: 'include',
				body: JSON.stringify({
					title: newTitle,
					description: newDescription,
				}),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const addProject = await response.json();
			dispatch({ type: ACTION_TYPE.ADD_PROJECT, payload: addProject.data });
			return addProject.data;
		} catch (e) {
			console.error('Server error', e);
			return null;
		}
	};
};

import { ACTION_TYPE } from './action-type';

export const addProjectAsync = (newTitle, newDescription) => {
	return async (dispatch) => {
		try {
			const response = await fetch(`/api/project`, {
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
			console.log('Задача добавлена, ответ от сервера:', addProject);
			dispatch({ type: ACTION_TYPE.ADD_PROJECT, payload: addProject.data });
		} catch (e) {
			console.error('Server error', e);
		}
	};
};

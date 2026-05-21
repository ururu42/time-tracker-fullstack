import { ACTION_TYPE } from './action-type';

export const updateProjectAsync = (projectId, title, description) => {
	return async (dispatch) => {
		try {
			const response = await fetch(`/api/project/${projectId}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
				credentials: 'include',
				body: JSON.stringify({
					title: title,
					description: description,
				}),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const updatedProject = await response.json();
			// console.log('Задача обновлена, ответ от сервера:', updatedProject);
			dispatch({ type: ACTION_TYPE.UPDATE_PROJECT, payload: updatedProject.data });
		} catch (e) {
			console.error('Server error', e);
		} finally {
			dispatch({ type: ACTION_TYPE.SET_LOADING, payload: false });
		}
	};
};

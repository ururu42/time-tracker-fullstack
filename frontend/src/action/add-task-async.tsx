import { ACTION_TYPE } from './action-type';

export const addTaskAsync = (taskData) => {
	return async (dispatch) => {
		try {
			const response = await fetch(`/api/tasks`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
				credentials: 'include',
				body: JSON.stringify(taskData),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const addedTask = await response.json();
			console.log('Задача добавлена, ответ от сервера:', addedTask);
			dispatch({ type: ACTION_TYPE.ADD_TASK, payload: addedTask.data });
		} catch (e) {
			console.error('Server error', e);
		}
	};
};

import { ACTION_TYPE } from './action-type';

export const updateTaskAsync = (taskId, title, description, status, priority) => {
	return async (dispatch) => {
		try {
			const response = await fetch(`/api/tasks/${taskId}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
				credentials: 'include',
				body: JSON.stringify({
					title: title,
					description: description,
					status: status,
					priority: priority,
				}),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const updatedTask = await response.json();
			console.log('Задача обновлена, ответ от сервера:', updatedTask);
			dispatch({ type: ACTION_TYPE.UPDATE_TASK, payload: updatedTask.data });
		} catch (e) {
			console.error('Server error', e);
		}
	};
};

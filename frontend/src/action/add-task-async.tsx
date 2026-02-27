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

			// Проверим структуру ответа сервера
			let taskPayload;
			if (addedTask.data) {
				// Если сервер возвращает {data: {...}}
				taskPayload = addedTask.data;
			} else {
				// Если сервер возвращает саму задачу
				taskPayload = addedTask;
			}

			console.log('Dispatching ADD_TASK with payload:', taskPayload);

			dispatch({ type: ACTION_TYPE.ADD_TASK, payload: taskPayload });
		} catch (e) {
			console.error('Server error', e);
		}
	};
};

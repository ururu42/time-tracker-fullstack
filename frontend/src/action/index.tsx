import { ACTION_TYPE } from './action-type';
import { Task } from '../models/Task';
import { TimeEntry, TimeEntryWithoutId } from '../models/TimeEntry';

// Task Actions
export const fetchTasks = (projectId: string | null = null) => {
	return async (dispatch: any, getState: any) => {
		try {
			dispatch({ type: ACTION_TYPE.SET_LOADING, payload: true });

			const { user } = getState();
			const token = localStorage.getItem('token');

			let url = `${(import.meta as any).env?.VITE_API_URL || '/api'}/tasks`;
			if (projectId) {
				url += `?projectId=${projectId}`;
			}

			const response = await fetch(url, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			dispatch({ type: ACTION_TYPE.SET_TASKS, payload: data.tasks || data });
			dispatch({ type: ACTION_TYPE.SET_LOADING, payload: false });

			return data;
		} catch (error: any) {
			dispatch({ type: ACTION_TYPE.SET_ERROR, payload: error.message });
			dispatch({ type: ACTION_TYPE.SET_LOADING, payload: false });
			throw error;
		}
	};
};

export const addTask = (
	taskData: Omit<Task, 'id' | 'owner' | 'createdAt' | 'updatedAt'>,
) => {
	return async (dispatch: any) => {
		try {
			dispatch({ type: ACTION_TYPE.SET_LOADING, payload: true });

			const token = localStorage.getItem('token');

			const response = await fetch(
				`${(import.meta as any).env?.VITE_API_URL || '/api'}/tasks`,
				{
					method: 'POST',
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(taskData),
				},
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			dispatch({ type: ACTION_TYPE.ADD_TASK, payload: data });
			dispatch({ type: ACTION_TYPE.SET_LOADING, payload: false });

			return data;
		} catch (error: any) {
			dispatch({ type: ACTION_TYPE.SET_ERROR, payload: error.message });
			dispatch({ type: ACTION_TYPE.SET_LOADING, payload: false });
			throw error;
		}
	};
};

export const updateTask = (id: string, taskData: Partial<Task>) => {
	return async (dispatch: any) => {
		try {
			dispatch({ type: ACTION_TYPE.SET_LOADING, payload: true });

			const token = localStorage.getItem('token');

			const response = await fetch(
				`${(import.meta as any).env?.VITE_API_URL || '/api'}/tasks/${id}`,
				{
					method: 'PUT',
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(taskData),
				},
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			dispatch({ type: ACTION_TYPE.UPDATE_TASK, payload: data });
			dispatch({ type: ACTION_TYPE.SET_LOADING, payload: false });

			return data;
		} catch (error: any) {
			dispatch({ type: ACTION_TYPE.SET_ERROR, payload: error.message });
			dispatch({ type: ACTION_TYPE.SET_LOADING, payload: false });
			throw error;
		}
	};
};

export const deleteTask = (id: string) => {
	return async (dispatch: any) => {
		try {
			dispatch({ type: ACTION_TYPE.SET_LOADING, payload: true });

			const token = localStorage.getItem('token');

			const response = await fetch(
				`${(import.meta as any).env?.VITE_API_URL || '/api'}/tasks/${id}`,
				{
					method: 'DELETE',
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			dispatch({ type: ACTION_TYPE.DELETE_TASK, payload: id });
			dispatch({ type: ACTION_TYPE.SET_LOADING, payload: false });
		} catch (error: any) {
			dispatch({ type: ACTION_TYPE.SET_ERROR, payload: error.message });
			dispatch({ type: ACTION_TYPE.SET_LOADING, payload: false });
			throw error;
		}
	};
};

// Time Entry Actions
export const addTimeEntry = (timeEntryData: TimeEntryWithoutId) => {
	return async (dispatch: any) => {
		try {
			dispatch({ type: ACTION_TYPE.SET_LOADING, payload: true });

			const token = localStorage.getItem('token');

			const response = await fetch(
				`${(import.meta as any).env?.VITE_API_URL || '/api'}/time`,
				{
					method: 'POST',
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(timeEntryData),
				},
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			dispatch({ type: ACTION_TYPE.ADD_TIME_ENTRY, payload: data });
			dispatch({ type: ACTION_TYPE.SET_LOADING, payload: false });

			return data;
		} catch (error: any) {
			dispatch({ type: ACTION_TYPE.SET_ERROR, payload: error.message });
			dispatch({ type: ACTION_TYPE.SET_LOADING, payload: false });
			throw error;
		}
	};
};

export const updateTimeEntry = (id: string, timeEntryData: Partial<TimeEntry>) => {
	return async (dispatch: any) => {
		try {
			dispatch({ type: ACTION_TYPE.SET_LOADING, payload: true });

			const token = localStorage.getItem('token');

			const response = await fetch(
				`${(import.meta as any).env?.VITE_API_URL || '/api'}/time/${id}`,
				{
					method: 'PUT',
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(timeEntryData),
				},
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			dispatch({ type: ACTION_TYPE.UPDATE_TIME_ENTRY, payload: data });
			dispatch({ type: ACTION_TYPE.SET_LOADING, payload: false });

			return data;
		} catch (error: any) {
			dispatch({ type: ACTION_TYPE.SET_ERROR, payload: error.message });
			dispatch({ type: ACTION_TYPE.SET_LOADING, payload: false });
			throw error;
		}
	};
};

export const deleteTimeEntry = (id: string) => {
	return async (dispatch: any) => {
		try {
			dispatch({ type: ACTION_TYPE.SET_LOADING, payload: true });

			const token = localStorage.getItem('token');

			const response = await fetch(
				`${(import.meta as any).env?.VITE_API_URL || '/api'}/time/${id}`,
				{
					method: 'DELETE',
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			dispatch({ type: ACTION_TYPE.DELETE_TIME_ENTRY, payload: id });
			dispatch({ type: ACTION_TYPE.SET_LOADING, payload: false });
		} catch (error: any) {
			dispatch({ type: ACTION_TYPE.SET_ERROR, payload: error.message });
			dispatch({ type: ACTION_TYPE.SET_LOADING, payload: false });
			throw error;
		}
	};
};

export * from './set-user';
export * from './setLoading';
export * from './logout';
export * from './fetch-projects';
export * from './add-project-async';
export * from './update-project-async';
export * from './remove-project-async';
export { ACTION_TYPE } from './action-type';

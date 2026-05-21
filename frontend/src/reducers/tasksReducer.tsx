import { ACTION_TYPE } from '../action';

const initialState = {
	byId: {},
	allIds: [],
	loading: false,
	error: null,
};

export const tasksReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_TASKS: {
			const tasks = Array.isArray(action.payload) ? action.payload : [];

			const normalizedTasks = {};
			const taskIds = [];

			for (const task of tasks) {
				normalizedTasks[task.id] = task;
				taskIds.push(task.id);
			}

			return {
				...state,
				byId: normalizedTasks,
				allIds: taskIds,
			};
		}

		case ACTION_TYPE.ADD_TASK:
			if (action.payload && action.payload.id) {
				const taskId = action.payload.id;

				return {
					...state,
					byId: {
						...state.byId,
						[taskId]: action.payload,
					},
					allIds: [taskId, ...state.allIds],
				};
			}
			return state;

		case ACTION_TYPE.UPDATE_TASK:
			if (action.payload && action.payload.id) {
				const taskId = action.payload.id;
				if (state.byId[taskId]) {
					return {
						...state,
						byId: {
							...state.byId,
							[taskId]: action.payload,
						},
					};
				}
			}
			return state;

		case ACTION_TYPE.DELETE_TASK:
			if (action.payload && typeof action.payload === 'string') {
				if (state.byId[action.payload]) {
					const newState = { ...state };
					delete newState.byId[action.payload];
					return {
						...newState,
						allIds: state.allIds.filter((id) => id !== action.payload),
					};
				}
			}

			return state;

		case ACTION_TYPE.LOGOUT:
			return initialState;

		default:
			return state;
	}
};

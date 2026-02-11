import { ACTION_TYPE } from '../action';
const initialState = {
	tasks: [],
	loading: false,
	error: null,
};

export const tasksReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTION_TYPE.ADD_TASK:
			return {
				...state,
				tasks: [...state.tasks, action.payload],
			};

		case ACTION_TYPE.DELETE_TASK:
			return {
				...state,
				tasks: state.tasks.filter((task) => task.id !== action.payload),
			};
		case ACTION_TYPE.LOGOUT:
			return initialState;

		default:
			return state;
	}
};

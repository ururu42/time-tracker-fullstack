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

		default:
			return state;
	}
};

import { ACTION_TYPE } from '../action';

const initialTimeEntriesState = {
	entries: [], // Array of time entries
	currentTimeEntry: null, // Currently running time entry
	loading: false,
	error: null,
};

export const timeEntriesReducer = (state = initialTimeEntriesState, action) => {
	switch (action.type) {
		case ACTION_TYPE.LOGOUT:
			return initialTimeEntriesState;

		case ACTION_TYPE.ADD_TIME_ENTRY:
			return {
				...state,
				entries: [...state.entries, action.payload],
			};

		case ACTION_TYPE.SET_CURRENT_TIME_ENTRY:
			return {
				...state,
				currentTimeEntry: action.payload,
			};

		case ACTION_TYPE.SET_TIME_ENTRIES:
			return {
				...state,
				entries: action.payload,
			};
		default:
			return state;
	}
};

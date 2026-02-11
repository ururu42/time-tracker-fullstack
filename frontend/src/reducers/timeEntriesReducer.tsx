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
		default:
			return state;
	}
};

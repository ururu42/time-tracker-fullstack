const initialTimeEntriesState = {
	entries: [], // Array of time entries
	currentTimeEntry: null, // Currently running time entry
	loading: false,
	error: null,
};

export const timeEntriesReducer = (state = initialTimeEntriesState, action) => {
	switch (action.type) {
		default:
			return state;
	}
};

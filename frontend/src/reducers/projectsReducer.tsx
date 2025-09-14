const initialProjectsState = {
	projects: [], // Array of projects
	currentProject: null, // Currently selected project
	loading: false,
	error: null,
};

export const projectsReducer = (state = initialProjectsState, action) => {
	switch (action.type) {
		default:
			return state;
	}
};

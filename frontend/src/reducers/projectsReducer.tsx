import { ACTION_TYPE } from '../action/action-type';

const initialProjectsState = {
	projects: [], // Array of projects
	currentProject: null, // Currently selected project
	loading: false,
	error: null,
};

export const projectsReducer = (state = initialProjectsState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_PROJECTS:
			return {
				...state,
				projects: action.payload,
			};

		case ACTION_TYPE.DELETE_PROJECT:
			return {
				...state,
				projects: state.projects.filter(
					(project) => project._id !== action.payload,
				),
			};

		case ACTION_TYPE.UPDATE_PROJECT:
			return {
				...state,
				projects: state.projects.map((project) =>
					project._id === action.payload._id ? action.payload : project,
				),
			};

		case ACTION_TYPE.ADD_PROJECT:
			return {
				...state,
				projects: [...state.projects, action.payload],
			};
		default:
			return state;
	}
};

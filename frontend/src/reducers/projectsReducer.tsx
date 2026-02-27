import { ACTION_TYPE } from '../action/action-type';

const initialProjectsState = {
	projects: [],
	currentProject: null,
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
					(project) => project.id !== action.payload,
				),
			};

		case ACTION_TYPE.UPDATE_PROJECT:
			return {
				...state,
				projects: state.projects.map((project) =>
					project.id === action.payload.id ? action.payload : project,
				),
			};

		case ACTION_TYPE.ADD_PROJECT:
			return {
				...state,
				projects: [...state.projects, action.payload],
			};

		case ACTION_TYPE.SET_CURRENT_PROJECT:
			return {
				...state,
				currentProject: action.payload,
			};

		case ACTION_TYPE.LOGOUT:
			return initialProjectsState;

		default:
			return state;
	}
};

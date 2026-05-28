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
			// Сортируем по дате создания (новые первыми)
			const sortedProjects = action.payload
				? [...action.payload].sort(
						(a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
					)
				: [];
			return {
				...state,
				projects: sortedProjects,
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
				projects: [action.payload, ...state.projects],
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

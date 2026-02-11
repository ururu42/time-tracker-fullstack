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
					(project) => project.id !== action.payload,
				),
			};

		case ACTION_TYPE.UPDATE_PROJECT:
			return {
				...state,
				projects: state.projects.map((project) =>
					project.id === action.payload._id ? action.payload : project,
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

// import { ACTION_TYPE } from '../action/action-type';
// import { Project } from '../models/Project';

// export interface itemsState {
// 	items: Project[];
// 	currentProject: Project | null;
// 	loading: boolean;
// 	error: string | null;
// }

// const initialitemsState: itemsState = {
// 	items: [], // Array of items
// 	currentProject: null, // Currently selected project
// 	loading: false,
// 	error: null,
// };

// interface SetitemsAction {
// 	type: typeof ACTION_TYPE.SET_items;
// 	payload: Project[];
// }

// interface DeleteProjectAction {
// 	type: typeof ACTION_TYPE.DELETE_PROJECT;
// 	payload: string;
// }

// interface UpdateProjectAction {
// 	type: typeof ACTION_TYPE.UPDATE_PROJECT;
// 	payload: Project;
// }

// interface AddProjectAction {
// 	type: typeof ACTION_TYPE.ADD_PROJECT;
// 	payload: Project;
// }

// type itemsAction =
// 	| SetitemsAction
// 	| DeleteProjectAction
// 	| UpdateProjectAction
// 	| AddProjectAction;

// export const itemsReducer = (
// 	state: itemsState = initialitemsState,
// 	action: itemsAction,
// ) => {
// 	switch (action.type) {
// 		case ACTION_TYPE.SET_items:
// 			return {
// 				...state,
// 				items: action.payload,
// 			};

// 		case ACTION_TYPE.DELETE_PROJECT:
// 			return {
// 				...state,
// 				items: state.items.filter((project) => project.id !== action.payload),
// 			};

// 		case ACTION_TYPE.UPDATE_PROJECT:
// 			return {
// 				...state,
// 				items: state.items.map((project) =>
// 					project.id === action.payload._id ? action.payload : project,
// 				),
// 			};

// 		case ACTION_TYPE.ADD_PROJECT:
// 			return {
// 				...state,
// 				items: [...state.items, action.payload],
// 			};

// 		case ACTION_TYPE.SET_CURRENT_PROJECT:
// 			return {
// 				...state,
// 				currentProject: action.payload,
// 			};

// 		case ACTION_TYPE.LOGOUT:
// 			return initialitemsState;

// 		default:
// 			return state;
// 	}
// };

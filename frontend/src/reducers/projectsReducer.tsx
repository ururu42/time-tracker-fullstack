import { ACTION_TYPE } from '../action/action-type';
import { Project } from '../models/Project';

export interface ProjectsState {
	items: Project[];
	currentProject: Project | null;
	loading: boolean;
	error: string | null;
}

const initialProjectsState: ProjectsState = {
	items: [], // Array of projects
	currentProject: null, // Currently selected project
	loading: false,
	error: null,
};

interface SetProjectsAction {
	type: typeof ACTION_TYPE.SET_PROJECTS;
	payload: Project[];
}

interface DeleteProjectAction {
	type: typeof ACTION_TYPE.DELETE_PROJECT;
	payload: string;
}

interface UpdateProjectAction {
	type: typeof ACTION_TYPE.UPDATE_PROJECT;
	payload: Project;
}

interface AddProjectAction {
	type: typeof ACTION_TYPE.ADD_PROJECT;
	payload: Project;
}

type ProjectsAction =
	| SetProjectsAction
	| DeleteProjectAction
	| UpdateProjectAction
	| AddProjectAction;

export const projectsReducer = (
	state: ProjectsState = initialProjectsState,
	action: ProjectsAction,
) => {
	switch (action.type) {
		case ACTION_TYPE.SET_PROJECTS:
			return {
				...state,
				items: action.payload,
			};

		case ACTION_TYPE.DELETE_PROJECT:
			return {
				...state,
				items: state.items.filter((project) => project.id !== action.payload),
			};

		case ACTION_TYPE.UPDATE_PROJECT:
			return {
				...state,
				items: state.items.map((project) =>
					project.id === action.payload.id ? action.payload : project,
				),
			};

		case ACTION_TYPE.ADD_PROJECT:
			return {
				...state,
				items: [...state.items, action.payload],
			};
		default:
			return state;
	}
};

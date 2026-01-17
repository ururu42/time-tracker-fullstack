import { Task } from '../models/Task';
import { ACTION_TYPE } from '../action/action-type';

export interface TasksState {
	items: Task[];
	loading: boolean;
	error: string | null;
}

const initialState: TasksState = {
	items: [],
	loading: false,
	error: null,
};

interface SetTasksAction {
	type: typeof ACTION_TYPE.SET_TASKS;
	payload: Task[];
}

interface AddTaskAction {
	type: typeof ACTION_TYPE.ADD_TASK;
	payload: Task;
}

interface UpdateTaskAction {
	type: typeof ACTION_TYPE.UPDATE_TASK;
	payload: Task;
}

interface DeleteTaskAction {
	type: typeof ACTION_TYPE.DELETE_TASK;
	payload: string;
}

type TasksAction = SetTasksAction | AddTaskAction | UpdateTaskAction | DeleteTaskAction;

export const tasksReducer = (
	state: TasksState = initialState,
	action: TasksAction,
): TasksState => {
	switch (action.type) {
		case ACTION_TYPE.SET_TASKS:
			return {
				...state,
				items: action.payload,
				loading: false,
				error: null,
			};

		case ACTION_TYPE.ADD_TASK:
			return {
				...state,
				items: [...state.items, action.payload],
			};

		case ACTION_TYPE.UPDATE_TASK:
			return {
				...state,
				items: state.items.map((task) =>
					task.id === action.payload.id ? action.payload : task,
				),
			};

		case ACTION_TYPE.DELETE_TASK:
			return {
				...state,
				items: state.items.filter((task) => task.id !== action.payload),
			};

		default:
			return state;
	}
};

// Action creators
export const setTasks = (tasks: Task[]): SetTasksAction => ({
	type: ACTION_TYPE.SET_TASKS,
	payload: tasks,
});

export const addTask = (task: Task): AddTaskAction => ({
	type: ACTION_TYPE.ADD_TASK,
	payload: task,
});

export const updateTask = (task: Task): UpdateTaskAction => ({
	type: ACTION_TYPE.UPDATE_TASK,
	payload: task,
});

export const deleteTask = (id: string): DeleteTaskAction => ({
	type: ACTION_TYPE.DELETE_TASK,
	payload: id,
});

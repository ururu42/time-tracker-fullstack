import { ACTION_TYPE } from '../action';

const initialUsersState = {
	items: [], 
	loading: false,
	error: null,
};

export const usersReducer = (state = initialUsersState, action) => {
	switch (action.type) {
		case ACTION_TYPE.LOGOUT:
			return initialUsersState;
		default:
			return state;
	}
};

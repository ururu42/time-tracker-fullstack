import { ACTION_TYPE } from '../action';

const initialUserState = {
	id: null,
	login: null,
	name: null,
	avatar: null,
	role: null,
	settings: {
		timezone: 'Europe/Chisinau', 
	},
	createdAt: null,
	updatedAt: null,
};
export const userReducer = (state = initialUserState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_USER:
			return {
				...state,
				...action.payload,
			};
		case ACTION_TYPE.LOGOUT:
			return initialUserState;

		case ACTION_TYPE.UPDATE_USER:
			return {
				...state,
				...action.payload,
			};
		default:
			return state;
	}
};

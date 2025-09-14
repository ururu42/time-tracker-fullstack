import { ACTION_TYPE } from '../action';


const initialUserState = {
  id: null,
  login: null,
  name: null,
  avatar: null,
  role: null,
  settings: {
    timezone: "Europe/Chisinau", // Default timezone
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

		default:
			return state;
	}
};

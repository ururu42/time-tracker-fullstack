import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import {
	appReducer,
	userReducer,
	usersReducer,
	projectsReducer, // Add this
	timeEntriesReducer, // Add this
} from './reducers';

const reducer = combineReducers({
	user: userReducer,
	users: usersReducer,
	projects: projectsReducer, // Add this
	timeEntries: timeEntriesReducer, // Add this
	app: appReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

import { ACTION_TYPE } from './action-type';

export const setLoading = (sectionloading, ) => ({
	type: ACTION_TYPE.SET_LOADING,
	payload: { loading, section },
});

export const setError = (error, section) => ({
	type: ACTION_TYPE.SET_ERROR,
	payload: { error, section },
});

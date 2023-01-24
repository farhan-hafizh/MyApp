import produce from "immer";

export const initialState = {
	isAuthenticated: false,
	accessToken: null,
	refreshToken: null,
	isLoading: false,
};

// * state key that will stored to localStorage
export const storedKey = ["accessToken", "refreshToken"];

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
	produce(state, (draft) => {});

export default appReducer;

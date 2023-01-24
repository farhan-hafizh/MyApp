import produce from "immer";
import { SET_ALL_FILES } from "./constants";

export const initialState = {
	files: null,
};

const landingReducer = (state = initialState, action) =>
	produce(state, (draft) => {
		// eslint-disable-next-line default-case
		switch (action.type) {
			case SET_ALL_FILES:
				draft.files = action.files;
				break;
		}
	});

export default landingReducer;

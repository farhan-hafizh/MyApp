import { combineReducers } from "@reduxjs/toolkit";
import { enableES5 } from "immer";
import appReducer, { storedKey as storedApp } from "./Containers/App/reducer";
import landingReducer from "./Pages/Landing/reducer";
import { mapWithPersistor } from "./persistance";

// * reducers that will stored to localStorage
const storedReducers = {
	app: { reducer: appReducer, whitelist: storedApp },
};

const temporaryReducers = {
	landing: landingReducer,
};

export default function createRecuer(injectedReducer = {}) {
	enableES5();
	return combineReducers({
		...mapWithPersistor(storedReducers),
		...temporaryReducers,
		...injectedReducer,
	});
}

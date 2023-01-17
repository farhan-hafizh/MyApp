import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import { persistConfig } from "./persistance";

import createRecuer from "./reducers";
import rootSaga from "./rootSaga";

const initialState = {};

const configuringStore = (initState = {}) => {
	const allReducers = persistReducer(persistConfig, createRecuer());
	const sagaMiddleware = createSagaMiddleware();
	const middlewares = [sagaMiddleware];

	const store = configureStore({
		reducer: allReducers,
		middleware: [...middlewares],
		preloadedState: initState,
		devTools: process.env.NODE_ENV === "production" ? false : true,
	});
	sagaMiddleware.run(rootSaga);

	return store;
};

const store = configuringStore(initialState);

export default store;
export const persistor = persistStore(store);

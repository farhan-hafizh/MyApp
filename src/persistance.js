import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";

export const persistConfig = {
	key: "root",
	storage,
	whitelist: [],
};

export const mapWithPersistor = (reducers) =>
	Object.entries(reducers)
		.map(([key, reducer]) => ({
			[key]: persistReducer(
				{
					key,
					storage,
					whitelist: reducer.whitelist,
				},
				reducer.reducer
			),
		}))
		.reduce((obj, item) => Object.assign(obj, item), {});

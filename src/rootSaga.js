import { all } from "redux-saga/effects";
import appSaga from "./Containers/App/saga";
import landingSaga from "./Pages/Landing/saga";

export default function* rootSaga() {
	yield all([appSaga(), landingSaga()]);
}

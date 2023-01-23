import { call, takeLatest } from "redux-saga/effects";
import { getUploadLink } from "../../Domain/api";
import { GET_UPLOAD_LINK } from "./constants";

export function* doGetLink({ data, cbSuccess, cbFailed }) {
	try {
		const { link } = yield call(getUploadLink, data);
		cbSuccess && cbSuccess(link);
	} catch (error) {
		cbFailed && cbFailed();
	}
}

export default function* landingSaga() {
	yield takeLatest(GET_UPLOAD_LINK, doGetLink);
}

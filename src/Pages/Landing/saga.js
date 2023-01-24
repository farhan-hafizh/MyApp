import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
	deleteUploadedFile,
	getAllFiles,
	getUploadLink,
	submitFile,
	// submitFile,
} from "../../Domain/api";
import { setAllFiles } from "./action";
import { GET_ALL_FILES, GET_UPLOAD_LINK, SUBMIT_FILE } from "./constants";

export function* doGetLink({ filename, extension, cbSuccess, cbFailed }) {
	try {
		const { link } = yield call(getUploadLink, { filename, extension });
		cbSuccess && cbSuccess(link);
	} catch (error) {
		console.log(error);
		cbFailed && cbFailed();
	}
}

export function* doDeleteUploadedFile({ url, cbSuccess }) {
	try {
		yield call(deleteUploadedFile, url);
		cbSuccess && cbSuccess();
	} catch (error) {
		console.log(error);
	}
}

export function* doSubmitFile({ data }) {
	try {
		yield call(submitFile, data);
	} catch (error) {
		console.log(error);
	}
}

export function* doGetAllFiles() {
	try {
		const { files } = yield call(getAllFiles);
		yield put(setAllFiles(files));
	} catch (error) {
		console.log(error);
	}
}

export default function* landingSaga() {
	yield takeEvery(GET_UPLOAD_LINK, doGetLink);
	yield takeLatest(SUBMIT_FILE, doSubmitFile);
	yield takeLatest(GET_ALL_FILES, doGetAllFiles);
}

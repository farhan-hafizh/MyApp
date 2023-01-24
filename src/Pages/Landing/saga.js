import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
	deleteFile,
	getAllFiles,
	getUploadLink,
	submitFile,
} from "../../Domain/api";
import { setAllFiles } from "./action";
import {
	DELETE_FILE,
	GET_ALL_FILES,
	GET_UPLOAD_LINK,
	SUBMIT_FILE,
} from "./constants";

export function* doGetLink({ filename, extension, cbSuccess, cbFailed }) {
	try {
		const { link } = yield call(getUploadLink, { filename, extension });
		cbSuccess && cbSuccess(link);
	} catch (error) {
		console.log(error);
		cbFailed && cbFailed();
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

export function* doDeleteFile({ id, url }) {
	try {
		yield call(deleteFile, { id, url });
	} catch (error) {
		console.log(error);
	}
}

export default function* landingSaga() {
	yield takeEvery(GET_UPLOAD_LINK, doGetLink);
	yield takeLatest(SUBMIT_FILE, doSubmitFile);
	yield takeLatest(GET_ALL_FILES, doGetAllFiles);
	yield takeLatest(DELETE_FILE, doDeleteFile);
}

import {
	DELETE_UPLOADED_FILE,
	GET_ALL_FILES,
	GET_UPLOAD_LINK,
	SET_ALL_FILES,
	SUBMIT_FILE,
} from "./constants";

export function getLinkAction(filename, extension, cbSuccess, cbFailed) {
	return {
		type: GET_UPLOAD_LINK,
		filename,
		extension,
		cbSuccess,
		cbFailed,
	};
}

export function deleteUploadedFileAction(url) {
	return {
		type: DELETE_UPLOADED_FILE,
		url,
	};
}

export function submitFileAction(data) {
	return {
		type: SUBMIT_FILE,
		data,
	};
}

export function getAllFilesAction() {
	return {
		type: GET_ALL_FILES,
	};
}

export function setAllFiles(files) {
	return {
		type: SET_ALL_FILES,
		files,
	};
}

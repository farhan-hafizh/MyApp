import { GET_UPLOAD_LINK } from "./constants";

export function getLinkAction(data, cbSuccess, cbFailed) {
	return {
		type: GET_UPLOAD_LINK,
		data,
		cbSuccess,
		cbFailed,
	};
}

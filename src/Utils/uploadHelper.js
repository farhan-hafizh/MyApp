import { base64ToBuffer, fileToBase64 } from "./base64Helper";

const fileUploadNoApi = (files, lastId) => {
	var filesReturn = [];
	var id = lastId + 1;
	files.forEach((file) => {
		var newfile = {
			id: id,
			name: file.name,
			extension: file.name.split(".").pop(),
			uploadedAt: Date.now(),
		};
		filesReturn.push(newfile);
	});
	return filesReturn;
};

const fileUploadS3 = async (url, file) => {
	console.log(file);
	const base64 = await fileToBase64(file);
	fetch(url, {
		method: "PUT",
		headers: {
			"Content-Type": "multipart/form-data",
		},
		body: base64ToBuffer(base64),
	});
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { fileUploadNoApi, fileUploadS3 };

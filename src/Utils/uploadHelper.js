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

export const handleUploadFile = async (files) => {
	let newFiles = [];
	for (const file of files) {
		const ext = file.name.split(".").pop();
		const base64 = await fileToBase64(file);
		const buffer = base64ToBuffer(base64);
		newFiles.push({ name: file.name, extension: ext, buffer });
	}
	return newFiles;
};

const fileUploadS3 = (url, buffer) => {
	fetch(url, {
		method: "PUT",
		headers: {
			"Content-Type": "multipart/form-data",
		},
		body: buffer,
	});
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { fileUploadNoApi, fileUploadS3, handleUploadFile };

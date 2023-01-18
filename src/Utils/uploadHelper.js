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

// eslint-disable-next-line import/no-anonymous-default-export
export default { fileUploadNoApi };

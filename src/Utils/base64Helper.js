import { Buffer } from "buffer";

export const base64ToBuffer = (base64) => {
	const splitted = base64.split(",");
	return Buffer.from(splitted[1], "base64");
};
export const fileToBase64 = (data) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(data);
		reader.onload = (e) => {
			resolve(e.target.result);
		};
	});

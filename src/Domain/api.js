import axios from "axios";
import { responseInterceptor } from "../Utils/apiHelper";

const API = axios.create({ baseURL: process.env.REACT_APP_ENDPOINT });

API.interceptors.response.use((res) => {
	res = responseInterceptor(res);
	return res;
});

const link = {
	get_upload_link: "/file/getLink",
	delete_uploaded_file: "/file/delete",
	submit_file: "/file/submit",
	get_all_files: "/file/getAll",
};

export const getUploadLink = (data) => API.post(link.get_upload_link, data);
export const deleteFile = (data) => API.post(link.delete_uploaded_file, data);
export const submitFile = (data) => API.put(link.submit_file, data);
export const getAllFiles = () => API.get(link.get_all_files);

import axios from "axios";
import { responseInterceptor } from "../Utils/apiHelper";

const API = axios.create({ baseURL: process.env.REACT_APP_ENDPOINT });

API.interceptors.response.use((res) => {
	res = responseInterceptor(res);
	return res;
});

const link = {
	get_upload_link: "/upload/getLink",
};

export const getUploadLink = (data) => API.post(link.get_upload_link, data);

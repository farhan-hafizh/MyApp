export const requestInterceptor = (req) => {
	req.headers.origin = process.env.REACT_APP_ORIGIN;
	return req;
};

export const responseInterceptor = (res) => {
	res = res.data;
	return res;
};

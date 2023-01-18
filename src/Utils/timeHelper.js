import moment from "moment";

const getCurrentFormattedTime = () => {
	return moment().format("MMMM Do YYYY, h:mm:ss a");
};

const getTimeFromNow = (timestamp) => {
	return moment(timestamp).fromNow();
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getCurrentFormattedTime, getTimeFromNow };

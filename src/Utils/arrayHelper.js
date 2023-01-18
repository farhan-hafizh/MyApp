const removeItemByIndex = (arr, index) => {
	const temp = arr;
	temp.splice(index, 1);
	return temp;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { removeItemByIndex };

const removeItemByIndex = (arr, index) => {
	const temp = arr;
	temp.splice(index, 1);
	return temp;
};

export default { removeItemByIndex };

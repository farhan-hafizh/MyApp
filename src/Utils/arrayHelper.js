const removeItemByIndex = (arr, index) => {
	const temp = arr;
	temp.splice(index, 1);
	return temp;
};

const removeItemById = (arr, id) => {
	return arr.filter((item) => {
		return item.id !== id;
	});
};

const getItemById = (arr, id) => {
	return arr.filter((item) => {
		return item.id === id;
	});
};
// eslint-disable-next-line import/no-anonymous-default-export
export default { removeItemByIndex, removeItemById, getItemById };

const getParamsObject = (searchParams) => {
	const obj = {};
	for (const [key, value] of searchParams.entries()) {
		if (obj[key]) {
			obj[key] = [].concat(obj[key], value);
		} else {
			obj[key] = value;
		}
	}
	return obj;
};
export default getParamsObject;

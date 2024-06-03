const priceToToken = (price) => {
	if (price < 10000) {
		return 0.5;
	} else if (price < 100000) {
		return 1;
	} else if (price < 500000) {
		return 1.5;
	} else if (price < 1000000) {
		return 2;
	} else if (price < 5000000) {
		return 2.5;
	} else if (price < 10000000) {
		return 3;
	} else if (price < 15000000) {
		return 4;
	} else if (price < 20000000) {
		return 5;
	} else if (price < 30000000) {
		return 6;
	} else if (price < 50000000) {
		return 7;
	} else if (price < 100000000) {
		return 10;
	} else if (price < 200000000) {
		return 15;
	} else {
		return 20;
	}
};

export default priceToToken;

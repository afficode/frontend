const getCommission = (value) => {
	let boonfuCommission;
	let grabberCommission;

	if (value <= 20000 && value > 0) {
		boonfuCommission = 1000;
		grabberCommission = 1000 / 2;
	} else if (value > 20000 && value <= 50000) {
		boonfuCommission = 2500;
		grabberCommission = 2500 / 2;
	} else if (value > 50000 && value <= 100000) {
		boonfuCommission = 5000;
		grabberCommission = 5000 / 2;
	} else if (value > 100000 && value <= 500000) {
		boonfuCommission = 7000;
		grabberCommission = 7000 / 2;
	} else if (value > 500000 && value <= 1000000) {
		boonfuCommission = 8500;
		grabberCommission = 8500 / 2;
	} else if (value > 1000000 && value <= 5000000) {
		boonfuCommission = 10000;
		grabberCommission = 10000 / 2;
	} else if (value > 5000000 && value <= 10000000) {
		boonfuCommission = 15000;
		grabberCommission = 15000 / 2;
	} else if (value > 10000000 && value <= 15000000) {
		boonfuCommission = 15000;
		grabberCommission = 15000 / 2;
	} else if (value > 20000000) {
		boonfuCommission = 30000;
		grabberCommission = 30000 / 2;
	}

	return { boonfuCommission, grabberCommission };
};

export default getCommission;

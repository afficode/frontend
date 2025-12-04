import { inspectableCategories } from '../constants/Category';

const getCommission = (price, subCat) => {
	if (!price || price <= 0) {
		return { boonfuCommission: 0, grabberCommission: 0 };
	}

	const subCategoryId = Number(subCat);
	const isInspectable = inspectableCategories.includes(subCategoryId);

	const rate = isInspectable ? 0.01 : 0.1;

	let boonfuCommission = price * rate;
	let grabberCommission = boonfuCommission / 2;

	boonfuCommission = Math.round(boonfuCommission);
	grabberCommission = Math.round(grabberCommission);

	return { boonfuCommission, grabberCommission };
};

export default getCommission;

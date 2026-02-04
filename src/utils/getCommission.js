import { inspectableCategories } from '../constants/Category';

const getCommission = (price, subCat) => {
    if (!price || price <= 0) {
        return { boonfuCommission: 0, grabberCommission: 0 };
    }

    const subCategoryId = Number(subCat);
    const isInspectable = inspectableCategories.includes(subCategoryId);

    const rate = isInspectable ? 0.01 : 0.1;

    const boonfuCommission = Math.round(price * rate);
    const grabberCommission = Math.round(boonfuCommission * 0.9);

    return { boonfuCommission, grabberCommission };
};

export default getCommission;

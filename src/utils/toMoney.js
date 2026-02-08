export const toMoney = (value, fixed) => {
    if (!value) {
        value = 0;
    }

    if (typeof value !== 'string') {
        value = String(value);
    }

    let fix = '00';

    if (value.includes('.')) {
        const split = value.split('.');
        value = split[0];
        fix = split[1];
    }

    value = value.split('').reverse();
    for (const i in value) {
        if ((i - 3) % 3 === 0 && Number(i) !== 0) {
            value[i] = `${value[i]},`;
        }
    }

    if (fixed) {
        return `${value.reverse().join('')}`;
    }
    return `${value.reverse().join('')}.${fix}`;
};

export const fromMoney = (value) => {
    if (value === null || value === undefined) {
        return 0;
    }

    if (typeof value === 'number') {
        return value;
    }

    if (typeof value === 'string') {
        const cleaned = value.trim().replace(/,/g, '');
        if (cleaned === '') {
            return 0;
        }
        const parsed = Number(cleaned);
        return isNaN(parsed) ? 0 : parsed;
    }

    return 0;
};

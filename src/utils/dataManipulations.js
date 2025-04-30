import { format } from 'date-fns';
export const manipulateCategory = (category) => {
	const categories = Object.groupBy(category, ({ category_id }) => category_id);

	return categories;
};

export const randomString = () => {
	//define a variable consisting alphabets in small and capital letter
	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz1234567890';

	//specify the length for the new string
	var lenString = 35;
	var randString = '';

	//loop to select a new character in each iteration
	for (var i = 0; i < lenString; i++) {
		var rnum = Math.floor(Math.random() * characters.length);
		randString += characters.substring(rnum, rnum + 1);
	}
	return randString;
};

export const encodeProductId = (ad_id) => {
	const encodedId = window.btoa(ad_id);
	return encodedId + randomString();
};

export const decodeProductId = (encodedId) => {
	const ad_id = window.atob(encodedId.slice(0, 4));
	return ad_id;
};

export const numberWithCommas = (x) => {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatCurrency = (x) => {
	if (!x) return '';

	// Convert the value to a number first
	const numericValue = parseFloat(x);

	// If the conversion fails, return the original value
	if (isNaN(numericValue)) return x;
	const parts = numericValue.toFixed(2).split('.');
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	return parts.join('.');
};

export const convertKeyToName = (ad) => {
	const keys = [
		'year',
		'color',
		'ad_condition',
		'property_type',
		'use',
		'size',
		'date_available',
		'facilities',
		'company_name',
		'service_type',
		'years',
		'mode_of_charge',
		'available_for_travel',
		'brand',
		'type',
		'material',
		'bulk_price',
		'gender',
		'age',
		'display_size',
		'style',
		'formulation',
		'scent_type',
		'platform',
		'format',
		'game_genre',
		'seller_type',
		'vehicle_specification',
		'make',
		'model',
		'vehicle_body',
		'vehicle_features',
		'transmission',
		'millage',
		'number_of_seat',
		'number_of_door',
		'fuel_type',
		'engine_size',
	];
	var overviews = [];
	if (ad === null || undefined) {
		return [];
	} else {
		keys.forEach((key) => {
			if (key in ad) {
				if (key.includes('_')) {
					const name = key
						.split('_')
						.map((val) => val[0].toUpperCase() + val.substring(1))
						.join(' ');
					overviews.push({
						name,
						param: key,
						value: key === 'date_available' ? format(new Date(ad[key]), 'PP') : ad[key],
					});
				} else {
					// it does not contain _
					const name = key[0].toUpperCase() + key.substring(1);
					overviews.push({
						name,
						param: key,
						value: ad[key],
					});
				}
			}
		});
	}
	return overviews;
};

export const arrayRange = (start, stop, step) =>
	Array.from({ length: (stop - start) / step + 1 }, (value, index) => start + index * step);

export const getStateLGA = (lga, state_id) => {
	const state_lga = lga.filter((val) => val.state_id === state_id);
	return state_lga;
};

export const removeNullObjectsValues = (productDetails) => {
	// convert the value to array, which return [key,value]
	const entries = Object.entries(productDetails);
	// filter the array
	const filteredEntries = entries.filter(([key, value]) => value !== null && value !== '');
	// convert the array back to object
	return Object.fromEntries(filteredEntries);
};

export const manipulatePrice = (price, category_id) => {
	if (category_id.toString().startsWith('50')) {
		switch (price) {
			case '1500000':
				const val = new Array('0', '1500000');
				return val;
			case '3000000':
				return new Array('1500000', '3000000');
			case '7500000':
				return new Array('3000000', '7500000');
			case '11000000':
				return new Array('7500000', '11000000');
			case '>11000000':
				return '11000000';
			default:
				return '';
		}
	} else {
		switch (price) {
			case '5000':
				const val = new Array('0', '5000');
				return val;
			case '10000':
				return new Array('5000', '10000');
			case '15000':
				return new Array('10000', '15000');
			case '20000':
				return new Array('15000', '20000');
			case '30000':
				return new Array('20000', '30000');
			case '>30000':
				return '30000';
			default:
				return '';
		}
	}
};
export const manipulateFilterForm = (values, category_id) => {
	// remove all the empty of null fields
	var filteredValue = removeNullObjectsValues(values);
	filteredValue = filteredValue?.price
		? { ...filteredValue, price: manipulatePrice(filteredValue.price, category_id) }
		: filteredValue;
	return filteredValue;
};

export const formatCardNumber = (cardNumber, spacing = 4) => {
	const regex = new RegExp(`(\\d{${spacing}})(?=\\d)`, 'g');
	return cardNumber.replace(regex, `$1 `);
};

export const toSelectOptions = (
	sourceData,
	name,
	placeholderText = 'Select an option',
	descending = false
) => {
	let computedOptions = [];

	const processString = (str) => {
		return str.replace(/&/g, 'and').toLowerCase();
	};

	if (Array.isArray(sourceData) && sourceData.length > 0) {
		if (name === 'category') {
			computedOptions = sourceData.map((data) => ({ key: data.name, value: data.id }));
		} else if (name === 'subcategory') {
			computedOptions = sourceData.map((data) => ({ key: data.name, value: data.id }));
		} else if (name === 'states') {
			computedOptions = sourceData.map((data) => ({ key: data.name, value: data.state_id }));
		} else if (name === 'lga') {
			computedOptions = sourceData.map((data) => ({ key: data.lga_name, value: data.id }));
		} else if (name === 'year') {
			computedOptions = sourceData.map((data) => ({
				key: data,
				value: data,
			}));
		} else {
			computedOptions = sourceData.map((data) => ({
				key: data,
				value: processString(data),
			}));
		}

		// Add the placeholder text at the beginning of the array
		computedOptions.unshift({ key: placeholderText, value: '' });

		// Sort the array alphabetically based on the 'key' property but move 'other' to the bottom
		if (name !== 'year') {
			computedOptions.sort((a, b) => {
				if (a.key.toLowerCase() === placeholderText.toLowerCase()) return -1;
				if (b.key.toLowerCase() === placeholderText.toLowerCase()) return 1;
				if (a.key.toLowerCase() === 'other') return 1;
				if (b.key.toLowerCase() === 'other') return -1;

				// Use ternary operator to sort in ascending or descending order
				return descending
					? b.key.localeCompare(a.key, 'en', { sensitivity: 'base' })
					: a.key.localeCompare(b.key, 'en', { sensitivity: 'base' });
			});
		}
	} else {
		computedOptions.push({ key: placeholderText, value: '' });
	}

	return computedOptions;
};

export const toOptions = (sourceData, name, descending = false) => {
	let computedOptions = [];

	const processString = (str) => {
		return str.replace(/&/g, 'and').toLowerCase();
	};

	if (Array.isArray(sourceData) && sourceData.length > 0) {
		if (name === 'subcategory') {
			computedOptions = sourceData.map((data) => ({ key: data.name, value: data.id }));
		} else if (name === 'states') {
			computedOptions = sourceData.map((data) => ({ key: data.name, value: data.state_id }));
		} else if (name === 'lga') {
			computedOptions = sourceData.map((data) => ({ key: data.lga_name, value: data.id }));
		} else {
			computedOptions = sourceData.map((data) => ({
				key: data,
				value: processString(data),
			}));
		}

		// Sort the array alphabetically based on the 'key' property but move 'other' to the bottom
		computedOptions.sort((a, b) => {
			if (a.key.toLowerCase() === 'other') return 1;
			if (b.key.toLowerCase() === 'other') return -1;

			// Use ternary operator to sort in ascending or descending order
			return descending
				? b.key.localeCompare(a.key, 'en', { sensitivity: 'base' })
				: a.key.localeCompare(b.key, 'en', { sensitivity: 'base' });
		});
	}

	return computedOptions;
};

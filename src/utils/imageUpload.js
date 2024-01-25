import axios from 'axios';
import { SHA1 } from 'crypto-js';

export const uploadImage = async (values) => {
	const formData = new FormData();
	formData.append('file', values);
	formData.append('upload_preset', import.meta.env.VITE_UPLOAD_PRESET);
	formData.append('folder', 'ads');

	const { data } = await axios.post(
		`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
		formData
	);

	return {
		path: data?.secure_url,
		filename: data?.public_id + '.' + data?.format,
	};
};

// to get a signature for the delete request
const generateSHA1 = (data) => {
	const hash = SHA1(data).toString();
	return hash;
};
const generateSignature = (publicId, apiSecret) => {
	const timestamp = new Date().getTime();
	return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
};
export const deleteImages = async (publicId) => {
	const cloudName = import.meta.env.VITE_CLOUD_NAME;
	const timestamp = new Date().getTime();
	const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;
	const apiSecret = import.meta.env.VITE_CLOUDINARY_SECRET;
	const signature = generateSHA1(generateSignature(publicId, apiSecret));
	const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

	try {
		const response = await axios.post(url, {
			public_id: publicId,
			signature: signature,
			api_key: apiKey,
			timestamp: timestamp,
		});

		return response;
	} catch (error) {
		console.error('Error deleting images:', error);
		return null;
	}
};

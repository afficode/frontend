import { useParams } from 'react-router-dom';
import CategoryForm from './CategoryForm';
import { useGetAd } from '../../hooks';
import { PropertyHeader } from '../../assets/images';
import LoadingScreen from './LoadingScreen';
import { ScrollToTop } from '../../utils';

const PostAd = () => {
	const { adId } = useParams();

	const { data: ad, isLoading } = useGetAd(adId);

	const categoryName = ad?.parent_category.toLowerCase().split(/[ ,]/)[0];
	const categoryId = ad?.parent_category_id;

	const initialValues = {
		50: {
			category: ad?.category,
			state_id: ad?.state_id,
			lga_id: ad?.lga_id,
			seller_type: ad?.seller_type,
			vehicle_specification: ad?.vehicle_specification,
			title: ad?.title,
			images: [],
			make: ad?.make,
			model: ad?.model,
			trim: ad?.trim,
			type: ad?.type,
			description: ad?.description,
			vehicle_id: ad?.vehicle_id,
			vehicle_features:
				typeof ad?.vehicle_features === 'string'
					? ad?.vehicle_features.split(',')
					: ad?.vehicle_features,
			ad_condition: ad?.ad_condition,
			vehicle_body: ad?.vehicle_body,
			contact_type:
				typeof ad?.contact_type === 'string' ? ad?.contact_type?.split(',') : ad?.contact_type,
			price: ad?.price,
			year: ad?.year,
			millage: ad?.millage,
			transmission: ad?.transmission,
			color: ad?.color,
			number_of_seat: ad?.number_of_seat,
			number_of_door: ad?.number_of_door,
			fuel_type: ad?.fuel_type,
			engine_size: ad?.engine_size,
			negotiable: ad?.negotiable,
			feature: ad?.feature,
		},
		51: {
			category: ad?.category,
			state_id: ad?.state_id,
			lga_id: ad?.lga_id,
			marketed_by: ad?.marketed_by,
			title: ad?.title,
			property_type:
				typeof ad?.property_type === 'string' ? ad?.property_type?.split(',') : ad?.property_type,
			ad_condition: ad?.ad_condition,
			furnished: ad?.furnished,
			time_period: ad?.time_period,
			room_bathroom: ad?.room_bathroom,
			size: ad?.size,
			date_available: ad?.date_available && new Date(ad?.date_available),
			facilities: typeof ad?.facilities === 'string' ? ad?.facilities?.split(',') : ad?.facilities,
			images: [],
			description: ad?.description,
			price: ad?.price,
			negotiable: ad?.negotiable,
			contact_type:
				typeof ad?.contact_type === 'string' ? ad?.contact_type?.split(',') : ad?.contact_type,
			feature: ad?.feature,
		},
		52: {
			category: ad?.category,
			state_id: ad?.state_id,
			lga_id: ad?.lga_id,
			images: [],
			title: ad?.title,
			type: ad?.type,
			expertise: ad?.expertise,
			make: ad?.make,
			available_to_travel: ad?.available_to_travel,
			years_of_experience: ad?.years_of_experience,
			employment_status: ad?.employment_status,
			level_of_education: ad?.level_of_education,
			employment_type: ad?.employment_type,
			description: ad?.description,
			price: ad?.price,
			negotiable: ad?.negotiable,
			contact_type:
				typeof ad?.contact_type === 'string' ? ad?.contact_type?.split(',') : ad?.contact_type,
			feature: ad?.feature,
		},
		53: {
			category: ad?.category,
			state_id: ad?.state_id,
			lga_id: ad?.lga_id,
			images: [],
			title: ad?.title,
			description: ad?.description,
			type: ad?.type,
			ad_condition: ad?.ad_condition,
			age: ad?.age,
			gender: ad?.gender,
			color: ad?.color,
			price: ad?.price,
			negotiable: ad?.negotiable,
			contact_type:
				typeof ad?.contact_type === 'string' ? ad?.contact_type?.split(',') : ad?.contact_type,
			feature: ad?.feature,
		},
		54: {
			category: ad?.category,
			state_id: ad?.state_id,
			lga_id: ad?.lga_id,
			images: [],
			title: ad?.title,
			description: ad?.description,
			ad_condition: ad?.ad_condition,
			brand: ad?.brand,
			type: ad?.type,
			resolution: ad?.resolution,
			input_mode: ad?.input_mode,
			display_technology: ad?.display_technology,
			electronics_style: ad?.electronics_style,
			connectivity: ad?.connectivity,
			connectivity_interface: ad?.connectivity_interface,
			features: ad?.features,
			electronics_display_size: ad?.electronics_display_size,
			ram_size: ad?.ram_size,
			storage: ad?.storage,
			storage_type: ad?.storage_type,
			sim_type: ad?.sim_type,
			exchange_possible: ad?.exchange_possible,
			processor: ad?.processor,
			operating_system: ad?.operating_system,
			color: ad?.color,
			price: ad?.price,
			negotiable: ad?.negotiable,
			contact_type:
				typeof ad?.contact_type === 'string' ? ad?.contact_type?.split(',') : ad?.contact_type,
			feature: ad?.feature,
		},
		55: {
			category: ad?.category,
			state_id: ad?.state_id,
			lga_id: ad?.lga_id,
			images: [],
			title: ad?.title,
			description: ad?.description,
			style: ad?.style,
			gender: ad?.gender,
			size: ad?.size,
			color: ad?.color,
			ad_condition: ad?.ad_condition,
			type: ad?.type,
			brand: ad?.brand,
			material: ad?.material,
			display: ad?.display,
			price: ad?.price,
			negotiable: ad?.negotiable,
			contact_type:
				typeof ad?.contact_type === 'string' ? ad?.contact_type?.split(',') : ad?.contact_type,
			feature: ad?.feature,
		},
		56: {
			category: ad?.category,
			state_id: ad?.state_id,
			lga_id: ad?.lga_id,
			images: [],
			title: ad?.title,
			description: ad?.description,
			brand: ad?.brand,
			type: ad?.type,
			age: ad?.age,
			gender: ad?.gender,
			color: ad?.color,
			ad_condition: ad?.ad_condition,
			formulation: ad?.formulation,
			scent_type: ad?.scent_type,
			price: ad?.price,
			negotiable: ad?.negotiable,
			contact_type:
				typeof ad?.contact_type === 'string' ? ad?.contact_type?.split(',') : ad?.contact_type,
			feature: ad?.feature,
		},
		57: {
			category: ad?.category,
			state_id: ad?.state_id,
			lga_id: ad?.lga_id,
			images: [],
			title: ad?.title,
			description: ad?.description,
			ad_condition: ad?.ad_condition,
			brand: ad?.brand,
			type: ad?.type,
			material: ad?.material,
			furniture_for: ad?.furniture_for,
			formulation: ad?.formulation,
			color: ad?.color,
			price: ad?.price,
			negotiable: ad?.negotiable,
			contact_type:
				typeof ad?.contact_type === 'string' ? ad?.contact_type?.split(',') : ad?.contact_type,
			feature: ad?.feature,
		},
		58: {
			category: ad?.category,
			state_id: ad?.state_id,
			lga_id: ad?.lga_id,
			images: [],
			title: ad?.title,
			description: ad?.description,
			company_name: ad?.company_name,
			type: ad?.type,
			service_area: ad?.service_area,
			service_features:
				typeof ad?.service_features === 'string'
					? ad?.service_features?.split(',')
					: ad?.service_features,
			payment_terms: ad?.payment_terms,
			mode_of_transport: ad?.mode_of_transport,
			form: typeof ad?.form === 'string' ? ad?.form?.split(',') : ad?.form,
			years_of_experience: ad?.years_of_experience,
			mode_of_charges: ad?.mode_of_charges,
			available_to_travel: ad?.available_to_travel,
			price: ad?.price,
			negotiable: ad?.negotiable,
			contact_type:
				typeof ad?.contact_type === 'string' ? ad?.contact_type?.split(',') : ad?.contact_type,
			feature: ad?.feature,
		},
		59: {
			category: ad?.category,
			state_id: ad?.state_id,
			lga_id: ad?.lga_id,
			images: [],
			title: ad?.title,
			description: ad?.description,
			ad_condition: ad?.ad_condition,
			platform: ad?.platform,
			type: ad?.type,
			format: ad?.format,
			release_year: ad?.release_year,
			game_genre: ad?.game_genre,
			rating: ad?.rating,
			price: ad?.price,
			negotiable: ad?.negotiable,
			contact_type:
				typeof ad?.contact_type === 'string' ? ad?.contact_type?.split(',') : ad?.contact_type,
			feature: ad?.feature,
		},
		60: {
			category: ad?.category,
			state_id: ad?.state_id,
			lga_id: ad?.lga_id,
			images: [],
			description: ad?.description,
			title: ad?.title,
			breed: ad?.breed,
			type: ad?.type,
			gender: ad?.gender,
			color: ad?.color,
			ad_condition: ad?.ad_condition,
			age: ad?.age,
			price: ad?.price,
			negotiable: ad?.negotiable,
			contact_type:
				typeof ad?.contact_type === 'string' ? ad?.contact_type?.split(',') : ad?.contact_type,
			feature: ad?.feature,
		},
		61: {
			category: ad?.category,
			state_id: ad?.state_id,
			lga_id: ad?.lga_id,
			images: [],
			title: ad?.title,
			description: ad?.description,
			ad_condition: ad?.ad_condition,
			brand: ad?.brand,
			type: ad?.type,
			gender: ad?.gender,
			color: ad?.color,
			capacity: ad?.capacity,
			age: ad?.age,
			size: ad?.size,
			price: ad?.price,
			bulk_price: ad?.bulk_price,
			contact_type:
				typeof ad?.contact_type === 'string' ? ad?.contact_type?.split(',') : ad?.contact_type,
			feature: ad?.feature,
		},
		62: {
			category: ad?.category,
			state_id: ad?.state_id,
			lga_id: ad?.lga_id,
			images: [],
			title: ad?.title,
			description: ad?.description,
			ad_condition: ad?.ad_condition,
			gender: ad?.gender,
			brand: ad?.brand,
			type: ad?.type,
			color: ad?.color,
			age: ad?.age,
			price: ad?.price,
			negotiable: ad?.negotiable,
			contact_type:
				typeof ad?.contact_type === 'string' ? ad?.contact_type?.split(',') : ad?.contact_type,
			feature: ad?.feature,
		},
		63: {
			category: ad?.category,
			state_id: ad?.state_id,
			lga_id: ad?.lga_id,
			seller_type: ad?.seller_type,
			// vehicle_specification: ad?.vehicle_specification,
			title: ad?.title,
			images: [],
			make: ad?.make,
			type: ad?.type,
			description: ad?.description,
			ad_condition:
				typeof ad?.ad_condition === 'string' ? ad?.ad_condition?.split(',') : ad?.ad_condition,
			year: ad?.year,
			mileage: ad?.mileage,
			transmission: ad?.transmission,
			color: ad?.color,
			fuel_type: ad?.fuel_type,
			// engine_size: ad?.engine_size,
			price: ad?.price,
			negotiable: ad?.negotiable,
			contact_type:
				typeof ad?.contact_type === 'string' ? ad?.contact_type?.split(',') : ad?.contact_type,
			feature: ad?.feature,
		},
		64: {
			category: ad?.category,
			state_id: ad?.state_id,
			lga_id: ad?.lga_id,
			images: [],
			title: ad?.title,
			description: ad?.description,
			ad_condition: ad?.ad_condition,
			color: ad?.color,
			type: ad?.type,
			min_price: ad?.min_price,
			max_price: ad?.max_price,
			negotiable: ad?.negotiable,
			contact_type:
				typeof ad?.contact_type === 'string' ? ad?.contact_type?.split(',') : ad?.contact_type,
			feature: ad?.feature,
		},
		65: {
			category: ad?.category,
			state_id: ad?.state_id,
			lga_id: ad?.lga_id,
			images: [],
			title: ad?.title,
			description: ad?.description,
			reason_for_deal: ad?.reason_for_deal,
			ad_condition: ad?.ad_condition,
			other_ad_condition: ad?.other_ad_condition,
			defects: ad?.defects,
			defects_detail: ad?.defects_detail,
			price: ad?.price,
			negotiable: ad?.negotiable,
			contact_type:
				typeof ad?.contact_type === 'string' ? ad?.contact_type?.split(',') : ad?.contact_type,
			feature: ad?.feature,
		},
	};

	return (
		<div className="px-4 my-12 sm:px-8 md:px-12">
			{categoryId === '51' ? (
				<img
					src={PropertyHeader}
					alt="property banner"
					className="w-full lg:h-[20rem] mx-auto object-fit rounded-xl my-8"
				/>
			) : (
				<h1 className="pt-6 text-center">Update Ad</h1>
			)}

			{isLoading ? (
				<LoadingScreen />
			) : (
				<div className="max-w-[1024px] mx-auto">
					<CategoryForm
						adId={adId}
						adImages={ad?.images}
						categoryId={categoryId}
						subCategoryId={ad.category}
						categoryName={categoryName}
						initialValues={initialValues[categoryId]}
					/>
				</div>
			)}

			<ScrollToTop />
		</div>
	);
};

export default PostAd;

import { useParams } from 'react-router-dom';
import CategoryForm from './CategoryForm';
import { useCategory } from '../../hooks';
import { PropertyHeader } from '../../assets/images';
import LoadingScreen from './LoadingScreen';
import { ScrollToTop } from '../../utils';

const PostAd = () => {
	const { categoryId } = useParams();

	const { data: category, isLoading } = useCategory(categoryId);

	const categoryName = category?.name ? category?.name.toLowerCase().split(/[ ,]/)[0] : '';

	const initialValues = {
		50: {
			category: '',
			state_id: '',
			lga_id: '',
			title: '',
			images: [],
			description: '',
			contact_type: [],
			price: '',
			negotiable: false,
			urgent: false,
		},
		51: {
			category: '',
			state_id: '',
			lga_id: '',
			title: '',
			images: [],
			description: '',
			price: '',
			contact_type: [],
			negotiable: false,
			urgent: false,
		},
		52: {
			category: '',
			state_id: '',
			lga_id: '',
			images: [],
			title: '',
			description: '',
			price: '',
			negotiable: false,
			contact_type: [],
			urgent: false,
		},
		53: {
			category: '',
			state_id: '',
			lga_id: '',
			images: [],
			title: '',
			description: '',
			price: '',
			negotiable: false,
			contact_type: [],
			urgent: false,
		},
		54: {
			category: '',
			state_id: '',
			lga_id: '',
			images: [],
			title: '',
			description: '',
			price: '',
			negotiable: false,
			contact_type: [],
			urgent: false,
		},
		55: {
			category: '',
			state_id: '',
			lga_id: '',
			images: [],
			title: '',
			description: '',
			price: '',
			negotiable: false,
			contact_type: [],
			urgent: false,
		},
		56: {
			category: '',
			state_id: '',
			lga_id: '',
			images: [],
			title: '',
			description: '',
			price: '',
			negotiable: false,
			contact_type: [],
			urgent: false,
		},
		57: {
			category: '',
			state_id: '',
			lga_id: '',
			images: [],
			title: '',
			description: '',
			price: '',
			negotiable: false,
			contact_type: [],
			urgent: false,
		},
		58: {
			category: '',
			state_id: '',
			lga_id: '',
			images: [],
			title: '',
			description: '',
			price: '',
			negotiable: false,
			contact_type: [],
			urgent: false,
		},
		59: {
			category: '',
			state_id: '',
			lga_id: '',
			images: [],
			title: '',
			description: '',
			price: '',
			negotiable: false,
			contact_type: [],
			urgent: false,
		},
		60: {
			category: '',
			state_id: '',
			lga_id: '',
			images: [],
			title: '',
			description: '',
			price: '',
			negotiable: false,
			contact_type: [],
			urgent: false,
		},
		61: {
			category: '',
			state_id: '',
			lga_id: '',
			images: [],
			title: '',
			description: '',
			price: '',
			negotiable: false,
			contact_type: [],
			urgent: false,
		},
		62: {
			category: '',
			state_id: '',
			lga_id: '',
			images: [],
			title: '',
			description: '',
			price: '',
			negotiable: false,
			contact_type: [],
			urgent: false,
		},
		63: {
			category: '',
			state_id: '',
			lga_id: '',
			images: [],
			title: '',
			description: '',
			price: '',
			negotiable: false,
			contact_type: [],
			urgent: false,
		},
		64: {
			category: '',
			state_id: '',
			lga_id: '',
			images: [],
			title: '',
			description: '',
			price: '',
			negotiable: false,
			contact_type: [],
			urgent: false,
		},
		65: {
			category: '',
			state_id: '',
			lga_id: '',
			images: [],
			title: '',
			description: '',
			price: '',
			negotiable: false,
			contact_type: [],
			urgent: false,
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
				<h1 className="pt-6 text-center">Post an Ad</h1>
			)}

			{isLoading ? (
				<LoadingScreen />
			) : (
				<div className="max-w-[1024px] mx-auto">
					<CategoryForm
						categoryId={categoryId}
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

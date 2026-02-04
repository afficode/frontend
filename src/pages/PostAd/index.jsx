import { useParams } from 'react-router-dom';
import CategoryForm from './CategoryForm';
import { useCategory } from '../../hooks';
import { PropertyHeader } from '../../assets/images';
import LoadingScreen from './LoadingScreen';
import { ScrollToTop } from '../../utils';
// import PostPreview from './PostPreview';

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
            // urgent: false,
            feature: '0',
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
            // urgent: false,
            feature: '0',
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
            // urgent: false,
            feature: '0',
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
            // urgent: false,
            feature: '0',
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
            // urgent: false,
            feature: '0',
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
            // urgent: false,
            feature: '0',
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
            // urgent: false,
            feature: '0',
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
            // urgent: false,
            feature: '0',
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
            // urgent: false,
            feature: '0',
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
            // urgent: false,
            feature: '0',
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
            // urgent: false,
            feature: '0',
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
            // urgent: false,
            feature: '0',
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
            // urgent: false,
            feature: '0',
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
            // urgent: false,
            feature: '0',
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
            // urgent: false,
            feature: '0',
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
            // urgent: false,
            feature: '0',
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
                    {/* <PostPreview /> */}
                </div>
            )}

            <ScrollToTop />
        </div>
    );
};

export default PostAd;

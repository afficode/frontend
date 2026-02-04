import ItemContainer from './ItemContainer';
import { getSaves } from '../../../hooks/useSaves';
import ClearAll from './ClearAll';
import { SpinnerSkeleton } from '../../../components';

const SavedItems = () => {
    const { data, isLoading } = getSaves();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <SpinnerSkeleton />
            </div>
        );
    }

    if (data?.saves?.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh]">
                <div className="text-center">
                    <h2 className="text-xl font-bold mb-2 text-primary">No Saved Items</h2>
                    <p className="text-gray-500">You have not saved any items yet.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-[1024px] mx-auto px-2 sm:px-4 my-5 sm:my-10 min-h-[500px]">
            <div className="flex justify-end">{data?.saves?.length >= 2 && <ClearAll />}</div>

            <div className="my-2 flex flex-col gap-6">
                {data?.saves?.map((saved, index) => (
                    <ItemContainer
                        name={saved?.title}
                        location={saved?.location}
                        specifications={[saved?.ad_condition]}
                        price={saved?.price}
                        images={saved?.images}
                        ads_id={saved?.ads_id}
                        key={index * 3}
                    />
                ))}
            </div>
        </div>
    );
};

export default SavedItems;

// name, location, specifications, price, images

// saved items data format
/* 
	[
		{
			name: "",
			location: "",
			price: "",
			specifications: [],
			images: []
		},
		{
			name: "",
			location: "",
			price: "",
			specifications: [],
			images: []
		},
	]
*/

import { differenceInDays } from 'date-fns';

const AdListingStatus = ({ createdAt, className = '' }) => {
    if (!createdAt) return null;

    const postedDaysAgo = differenceInDays(new Date(), new Date(createdAt));

    return (
        <span
            className={`w-fit px-2 py-0.5 tracking-tighter rounded-full text-xs font-semibold uppercase text-white ${
                postedDaysAgo > 3 ? 'bg-orange-500' : 'bg-green-500'
            } ${className}`}
        >
            {postedDaysAgo > 3 ? 'Hot Listing' : 'Just Listed'}
        </span>
    );
};

export default AdListingStatus;

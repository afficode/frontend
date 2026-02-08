import { Link, useNavigate } from 'react-router-dom';
import { CameraWhite } from '../../../assets/svgs';
import { Button } from '../../../ui';
import { slugGeneratorForAdIdWithName, toMoney } from '../../../utils';
import { useNotify, useUpdateAd } from '../../../hooks';
import { useQueryClient } from 'react-query';
import useAuth from '../../../context/UserContext';
import { GRAB_AD_EXPIRY_DAYS } from '../../../constants';
import { addDays, format } from 'date-fns';

const AdCard = ({
    title,
    images,
    active,
    price,
    views,
    adId,
    chats,
    available,
    feature,
    grab_activity,
}) => {
    const navigate = useNavigate();
    const notify = useNotify();
    const { user } = useAuth();
    const { mutate } = useUpdateAd(adId);
    const queryClient = useQueryClient();

    const handleEdit = (adId) => {
        navigate(`/update-ad/${adId}`);
    };

    const closeAdvert = () => {
        const formData = new FormData();
        formData.append('active', '2');
        formData.append('available', available || 1);
        if (feature === '3') {
            formData.append('applyPolicy', 'close');
            formData.append('owner', user.id);
            formData.append('created_at', grab_activity[0]?.created_at);
        }
        mutate(formData, {
            onSuccess: () => {
                notify('Advert closed successfully', 'success');
                setTimeout(() => {
                    queryClient.invalidateQueries({ queryKey: ['getUserAds'] });
                }, 3000);
            },
            onError: () => {
                notify(
                    'Error closing Ad. If this error persist, please contact Admin with the contact us form.',
                    'error'
                );
            },
        });
    };

    const renewAdvert = () => {
        const formData = new FormData();
        if (feature === '3') {
            formData.append('applyPolicy', 'roll_over');
            formData.append('owner', user.id);
            formData.append('created_at', grab_activity[0]?.created_at);
        }
        mutate(formData, {
            onSuccess: () => {
                notify('Advert renewed successfully', 'success');
                setTimeout(() => {
                    queryClient.invalidateQueries({ queryKey: ['getUserAds'] });
                }, 3000);
            },
            onError: () => {
                notify(
                    'Error renewing Ad. If this error persist, please contact Admin with the contact us form.',
                    'error'
                );
            },
        });
    };

    const createdAt = (feature === '3' && new Date(grab_activity[0]?.created_at)) || new Date();

    const diffInMs = Date.now() - createdAt;
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    const isExpired = feature === '3' && diffInDays > GRAB_AD_EXPIRY_DAYS;

    const expiryDate = addDays(new Date(createdAt), GRAB_AD_EXPIRY_DAYS);

    return (
        <Link
            to={`/product/${slugGeneratorForAdIdWithName(title, adId)}`}
            className={isExpired ? 'pointer-events-none relative' : 'relative'}
        >
            <div className="bg-gray-200 w-[18rem] sm:w-[20rem]">
                {/* image  */}
                <div className="w-full h-[13rem]  sm:h-[15rem] relative border border-gray-300">
                    <img
                        src={images[0]?.path}
                        alt={images[0]?.filename}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 flex items-center w-full gap-2 p-2 bg-black/60">
                        <img src={CameraWhite} alt="images" className="w-4" />
                        <span className="text-white">{images.length}</span>
                    </div>
                    <div
                        className="z-[11] absolute top-4 right-4
"
                    >
                        {isExpired ? (
                            <span className=" text-white font-semibold bg-[#00000080] py-2 px-3 rounded-xl text-center max-sm:text-sm">
                                Expired
                            </span>
                        ) : (
                            <>
                                {active === '1' && available === '1' && (
                                    <span className=" text-white font-semibold bg-[#047F73] py-1 px-2 rounded-xl text-center border-4 border-white max-sm:text-sm">
                                        Active
                                    </span>
                                )}
                                {active === '2' && (
                                    <span className=" text-white font-semibold bg-primary py-1 px-2 rounded-xl text-center border-4 border-white max-sm:text-sm">
                                        Closed
                                    </span>
                                )}

                                {active === '0' && available === '1' && (
                                    <div className=" text-white font-semibold bg-red-500 py-1 px-2 rounded-xl text-center border-4 border-white max-sm:text-sm">
                                        Blocked
                                    </div>
                                )}

                                {active === '1' && available === '0' && (
                                    <div className=" text-white font-semibold bg-primary py-1 px-2 rounded-xl text-center border-4 border-white max-sm:text-sm">
                                        In Review
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* details  */}
                <div className="flex flex-col justify-between px-3 py-2 ">
                    <div className="w-full">
                        <h4 className="capitalize truncate">{title}</h4>
                        <span className="block font-semibold text-primary max-sm:text-sm">
                            ₦{toMoney(price)}
                        </span>
                        {feature === '3' ? (
                            <span className="mt-3 max-sm:text-sm">
                                Promoted till: <b>{format(expiryDate, 'd MMM yyyy')}</b>
                            </span>
                        ) : (
                            <span className="mt-3 max-sm:text-sm">
                                Promoted till: <b>None</b>
                            </span>
                        )}
                    </div>

                    <div className="flex justify-between mt-3">
                        <div className="py-3 pl-3 pr-5 space-y-1 bg-white max-sm:text-sm mt-auto">
                            <div>
                                <span>Views:</span> <b>{views}</b>
                            </div>
                            <div>
                                <span>Chats:</span> <b>{chats}</b>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 justify-between max-sm:text-sm">
                            <Button
                                variant={'plain'}
                                size={'small'}
                                className={'text-primary rounded-lg shadow-none hover:shadow-md'}
                                disabled={active === '2'}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();

                                    handleEdit(adId);
                                }}
                            >
                                Edit
                            </Button>
                            <Button
                                variant={'plain'}
                                size={'small'}
                                className={'text-primary rounded-lg shadow-none hover:shadow-md'}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();

                                    closeAdvert();
                                }}
                                disabled={active === '2'}
                            >
                                Close
                            </Button>
                            <Button
                                variant={'secondary'}
                                size={'small'}
                                className={' rounded-lg '}
                                disabled={active === '2'}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();

                                    navigate(`/update-ad/${adId}#post-package`);
                                }}
                            >
                                Promote
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className={
                    isExpired
                        ? 'absolute inset-0 pointer-events-none z-10 bg-[#D9D9D9B0] flex items-center justify-center'
                        : 'hidden'
                }
            >
                <div className="flex items-center gap-4 w-full px-2">
                    <Button
                        variant={'plain'}
                        size={'full'}
                        className={'text-black rounded-md pointer-events-auto !px-4 !w-full '}
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();

                            renewAdvert();
                        }}
                    >
                        Renew
                    </Button>
                    <Button
                        variant={'primary'}
                        size={'full'}
                        className={
                            'text-white !bg-gray-600 rounded-md pointer-events-auto !px-4 !w-full '
                        }
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();

                            closeAdvert();
                        }}
                    >
                        Downgrade
                    </Button>
                </div>
            </div>
        </Link>
    );
};

export default AdCard;

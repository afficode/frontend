import { Carousel } from 'flowbite-react';
import { FaCamera, FaMapMarkerAlt } from 'react-icons/fa';
import { TbCurrencyNaira } from 'react-icons/tb';
import { noimage } from '../../../assets/images';
import { useNavigate } from 'react-router-dom';
import { numberWithCommas } from '../../../utils/index.js';
import { formatDistance } from 'date-fns';
import SaveProduct from './SaveProduct';
import useAuth from '../../../context/UserContext';
import { NegotiableIcon } from '../../../ui';
import { GrabIcon } from '../../../ui';

const FeaturedProducts = ({ product }) => {
    const { isLogin, user } = useAuth();

    const navigate = useNavigate();

    return (
        <>
            {product.map((ad, index) => (
                <div
                    onClick={() => navigate(`/product/${ad.id}`)}
                    key={index}
                    className="overflow-hidden min-w-[18rem] md:w-[18rem] sm:w-full min-h-[12rem] md:h-[22rem] bg-white hover:bg-gray-200 border border-gray-200 rounded-lg shadow-sm cursor-pointer hover:shadow-lg transition-all  ease-in-out"
                >
                    <div
                        onClick={(e) => {
                            const {target} = e;
                            if (!target) {return;}

                            const isArrow = target.closest(
                                'button[data-testid="carousel-right-control"], button[data-testid="carousel-left-control"]'
                            );

                            if (isArrow) {
                                e.stopPropagation();
                                e.preventDefault();
                            }
                        }}
                        className="relative rounded-none"
                    >
                        {ad.images.length > 0 ? (
                            <Carousel className="h-[200px] md:h-[230px] rounded-none">
                                {ad.images.map((img, index) => (
                                    <img
                                        src={img.path}
                                        alt={img.filename}
                                        key={index * 3}
                                        className="w-full h-full  rounded-b-none "
                                    />
                                ))}
                            </Carousel>
                        ) : (
                            <div className="h-[120px] md:h-[230px] rounded-none">
                                <img src={noimage} alt="no image" className="w-full h-full mx-auto rounded-none" />
                            </div>
                        )}

                        {((isLogin && ad?.owner !== user?.id) || !isLogin) && (
                            <SaveProduct
                                ads_id={ad.id}
                                className="absolute w-10 h-12 p-1 px-2 bg-gray-200 rounded shadow-2xl top-4 right-4 hover:bg-white "
                            />
                        )}

                        <div className="absolute bottom-0 flex w-full h-10 pt-2 pl-2 text-white rounded-none bg-black/50">
                            <FaCamera className="my-auto text-lg" />
							&emsp; <span className="my-auto"> {ad?.images.length}</span>
                        </div>
                    </div>

                    <div className="w-full p-2 tracking-tighter tooltip tooltip-secondary line-clamp-1 ">
                        <p className="flex items-start justify-start h-6 overflow-hidden text-xl font-semibold uppercase lg:h-8 ">
                            {ad.title.toString().trimEnd().trim()}{' '}
                        </p>
                        <div className="flex items-center justify-start w-full mt-1 text-start text-ellipsis flex-nowrap line-clamp-1">
                            <FaMapMarkerAlt className="inline-block mr-1" />
                            <p className="text-xs tracking-tighter md:text-md lg:text-lg line-clamp-1">{ad.location}</p>
                        </div>
                        <p className="flex justify-between mt-4 tracking-tighter  line-clamp-1">
                            <span className="flex">
                                <TbCurrencyNaira className="mt-1" />
                                {numberWithCommas(ad.price)}
                            </span>
                            <span className="flex justify-around gap-2 my-auto text-xl font-bold">
                                <NegotiableIcon negotiable={ad?.negotiable} />
                                {ad?.feature === '3' && isLogin && <GrabIcon className="text-secondary" />}
                            </span>{' '}
							&nbsp;
                            <span className="tracking-tighter">
                                {formatDistance(new Date(new Date(`${ad?.created_at}`)), Date.now(), {
                                    includeSeconds: true,
                                    addSuffix: true,
                                }).includes('about') ? (
                                        <>
                                            {formatDistance(new Date(new Date(`${ad?.created_at}`)), Date.now(), {
                                                includeSeconds: true,
                                                addSuffix: true,
                                            }).substring(5)}
                                        </>
                                    ) : (
                                        <>
                                            {formatDistance(new Date(new Date(`${ad?.created_at}`)), Date.now(), {
                                                includeSeconds: true,
                                                addSuffix: true,
                                            })}
                                        </>
                                    )}
                            </span>
                        </p>
                    </div>
                </div>
            ))}
        </>
    );
};

export default FeaturedProducts;

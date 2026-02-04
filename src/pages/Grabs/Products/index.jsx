import { GrabIcon, GrabSave } from '../../../assets/svgs';
import { Button } from '../../../ui';
import GrabHeader from '../GrabHeader';
import { Link } from 'react-router-dom';
import { Approutes } from '../../../constants';
import { ScrollToTop } from '../../../utils';
import { useGetGrabs } from '../../../hooks';
import { SpinnerSkeleton } from '../../../components';
import useGrabContext from '../../../context/GrabContext';
import { useQueryClient } from 'react-query';
import { noimage } from '../../../assets/images';

const GrabProducts = () => {
    const { data: result, isLoading } = useGetGrabs();
    const { unGrabAd } = useGrabContext();
    const queryClient = useQueryClient();

    const handleUnGrab = (ad) => {
        unGrabAd(ad.ads_id);
        queryClient.invalidateQueries({ queryKey: ['get-grabs'] });
    };

    if (isLoading)
    {return (
        <section>
            <GrabHeader text="Grabber’s Products Page" />
            <div className="flex items-center justify-center p-16">
                <SpinnerSkeleton />
            </div>
        </section>
    );}

    return (
        <section>
            <GrabHeader text="Grabber’s Products Page" />

            <div className="flex flex-wrap items-center justify-between gap-6 mt-8 mb-12 ">
                {result?.grabs?.map((ad) => (
                    // <Link key={ad.ads_id} to={Approutes.grab.product(ad.ads_id)}>
                    <div className="relative flex mx-auto flex-col w-[250px] bg-white border ">
                        <button>
                            <img src={GrabSave} alt="save" className="absolute w-8 top-2 left-2" />
                        </button>
                        <button onClick={() => handleUnGrab(ad)}>
                            <img src={GrabIcon} alt="grab" className="absolute w-8 top-2 right-2" />
                        </button>
                        <img
                            src={ad?.images[0]?.path ? ad?.images[0]?.path : noimage}
                            alt={ad?.images[0]?.filename ? ad?.images[0]?.filename : 'no image'}
                            className="w-full h-[200px] "
                        />
                        <h6 className="px-2 font-semibold text-left capitalize">{ad.title}</h6>
                        <Link to={Approutes.grab.product(ad.ads_id)} className={'mt-8 mb-2 mx-auto'}>
                            <Button variant={'primary'} size={'small'} className={'w-fit'}>
								Click for info
                            </Button>
                        </Link>
                    </div>
                    // </Link>
                ))}
            </div>

            <ScrollToTop />
        </section>
    );
};

export default GrabProducts;

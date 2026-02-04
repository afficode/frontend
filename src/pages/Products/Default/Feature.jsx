import { feature_basic, feature_feature, feature_spotlight } from '../../../assets/images/index.js';

const Feature = ({ feature }) => {
    return (
        <div
            className={'w-[70%] absolute top-2 -left-2 ml-0.5  text-center uppercase text-black rounded-r-sm font-semibold'}
        >
            <div className="relative">
                {feature === '0' && <img src={feature_basic} alt={'basic feature'} className="h-10" />}
                {feature === '1' && <img src={feature_feature} alt={'feature'} className="h-10" />}
                {feature === '2' && <img src={feature_spotlight} alt={'spotlight feature'} className="h-10" />}
            </div>
        </div>
    );
};

export default Feature;

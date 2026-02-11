import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { noimage } from '../../assets/images';

const Carousel = ({ items, className }) => {
    const images = items.map((item) => ({
        original: String(item.path || ''),
        thumbnail: String(item.path || ''),
    }));

    // console.log(typeof images);

    return (
        <div className={`w-full ${className}`}>
            {images.length === 0 ? (
                <img src={noimage} alt="No Image for this Ad" className="w-full mx-auto" />
            ) : (
                <ImageGallery items={images} showThumbnails={true} showPlayButton={false} />
            )}
        </div>
    );
};

export default Carousel;

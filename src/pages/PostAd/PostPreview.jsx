import { PreviewInfo } from '../../assets/images';

const PostPreview = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <h3>Advert Posting Preview</h3>

            <div className="flex items-center gap-4 bg-[#D9D9D9] p-4">
                <div className="w-[252px]">
                    <img src={PreviewInfo} alt="/" className="w-full h-full " />
                </div>

                <div className="flex flex-col gap-4 justify-between">
                    <p>We are checking IF your advert content meets our guidelines, terms and conditions.</p>
                    <p>We will try to expedite your advert going LIVE upon preview.</p>
                    <p>Preview takes between 3 to 10mins. </p>
                </div>
            </div>
        </div>
    );
};

export default PostPreview;

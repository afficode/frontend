import {
    useCreateInteraction,
    useSendDiscussion,
    useImageCompressor,
    useNotify,
} from '../../../hooks';
import { addWatermarkToImage } from '../../../utils';

const DiscussionInput = ({
    requestId,
    interactionId,
    role,
    disabled,
    discussionsList,
    interaction,
}) => {
    const { mutate: createInteraction, isLoading: isCreating } = useCreateInteraction(requestId);
    const { mutate: sendDiscussion, isLoading: isSending } = useSendDiscussion();
    const { compressImages } = useImageCompressor();
    const notify = useNotify();

    const handleOptionClick = async (option, event = null) => {
        let payload = { user_option: option.value };
        const formData = new FormData();
        formData.append('user_option', option.value);
        payload = formData;

        if (option.type === 'file' || option.type === 'files') {
            const files = event?.target?.files;
            if (!files || files.length === 0) return;

            try {
                const watermarkedImages = await Promise.all(
                    Array.from(files).map((file) => addWatermarkToImage(file))
                );
                const compressedImages = await compressImages(watermarkedImages);

                const formData = new FormData();
                formData.append('user_option', option.value);
                if (option.type === 'files') {
                    compressedImages.forEach((img) => formData.append('more_image', img));
                } else {
                    formData.append('image', compressedImages[0]);
                }
                payload = formData;
            } catch (error) {
                notify('Failed to process image', 'error');
                return;
            }
        }

        const onSuccess = () => {
            if (event?.target) event.target.value = null;
        };

        const onError = (err) => {
            notify(err?.response?.data?.message || 'Failed to send message', 'error');
        };

        if (interactionId) {
            payload.append('interaction_id', interactionId);
            sendDiscussion(payload, { onSuccess, onError });
        } else {
            createInteraction(payload, { onSuccess, onError });
        }
    };

    const response = role === 'publisher' ? publisherResponse : interactorResponse;
    const isLoading = isCreating || isSending;

    const shareContactSelected =
        interaction?.show_contact === 1 ||
        discussionsList?.some((msg) => msg.user_option === 'share_contact');
    const isChatClosed =
        shareContactSelected ||
        discussionsList?.some((msg) => msg.user_option === 'not_interested') ||
        interaction?.closed === 1;

    if (isChatClosed) {
        return (
            <div className='bg-white p-4 flex flex-col items-center justify-center border-t border-gray-100 min-h-[80px] gap-2'>
                <span className='text-sm text-secondary font-bold uppercase'>
                    This conversation is closed
                </span>
                {shareContactSelected && role === 'publisher' ? (
                    <div className='bg-gray-50 border border-gray-100 rounded-xl p-3 flex flex-col items-center shadow-sm w-full max-w-[300px]'>
                        <span className='text-xs text-gray-500 font-bold uppercase mb-1'>
                            Interactor Contact
                        </span>
                        <a
                            href={`tel:${interaction?.phone_number}`}
                            className='text-sm font-extrabold text-primary hover:underline'
                        >
                            {interaction?.phone_number &&
                                interaction?.phone_number !== 'N/A' &&
                                interaction?.phone_number}
                        </a>
                    </div>
                ) : shareContactSelected && role === 'interactor' ? (
                    <div className='bg-gray-50 border border-gray-100 rounded-xl p-3 flex flex-col items-center shadow-sm w-full max-w-[300px]'>
                        <span className='text-sm font-extrabold text-black'>
                            Your contact has been shared
                        </span>
                    </div>
                ) : null}
            </div>
        );
    }

    if (disabled) {
        return (
            <div className='bg-white p-4 flex items-center justify-center border-t border-gray-100 min-h-[60px]'>
                {discussionsList.length === 0 && role === 'publisher' ? (
                    <span className='text-sm text-secondary font-semibold italic'>
                        No interaction on your request yet.
                    </span>
                ) : (
                    <span className='text-sm text-secondary font-semibold italic'>
                        Hold for {role === 'publisher' ? 'interactor' : 'publisher'} response
                    </span>
                )}
            </div>
        );
    }

    const sortedDiscussions = [...(discussionsList || [])].sort(
        (a, b) => new Date(a.created_on) - new Date(b.created_on)
    );
    const lastPublisherImageRequest = sortedDiscussions
        .reverse()
        .find(
            (msg) => msg.user_option === 'share_image' || msg.user_option === 'more_image'
        )?.user_option;

    const publisherAskedForShareImage = lastPublisherImageRequest === 'share_image';
    const publisherAskedForMoreImage = lastPublisherImageRequest === 'more_image';

    return (
        <div
            className={`bg-white max-sm:p-3 p-4 flex items-center gap-2 flex-wrap ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
        >
            {response.map((res) => {
                const hasSelected = discussionsList?.some((msg) => msg.user_option === res.value);

                let isConflictDisabled = false;
                if (role === 'interactor') {
                    if (
                        res.value === 'more_image_interactor' &&
                        publisherAskedForShareImage &&
                        !hasSelected
                    ) {
                        isConflictDisabled = true;
                    }
                    if (
                        res.value === 'share_image_interactor' &&
                        publisherAskedForMoreImage &&
                        !hasSelected
                    ) {
                        isConflictDisabled = true;
                    }
                }

                const isDisabled = hasSelected || isConflictDisabled;

                if (res.type.includes('file')) {
                    return (
                        <label
                            key={res.label}
                            className={`${res.type === 'file' ? 'bg-gray-50 text-gray-500 border border-gray-100' : 'bg-secondary/10 text-secondary border border-secondary/50'} text-[10px] sm:text-xs font-bold  rounded-2xl px-4 py-1 uppercase transition-colors ${isDisabled ? 'opacity-50 !cursor-not-allowed pointer-events-none' : 'cursor-pointer hover:shadow-sm'}`}
                        >
                            {res.label}
                            <input
                                key={res.label}
                                type='file'
                                multiple={res.type === 'files'}
                                className='hidden'
                                accept='image/*'
                                onChange={(e) => handleOptionClick(res, e)}
                                disabled={isDisabled}
                            />
                        </label>
                    );
                } else {
                    return (
                        <button
                            disabled={isDisabled}
                            onClick={() => handleOptionClick(res)}
                            key={res.label}
                            className={`bg-gray-50 border border-gray-100 rounded-2xl px-4 py-1 text-gray-500 font-bold text-[10px] sm:text-xs uppercase transition-colors ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:text-gray-700 hover:bg-gray-100'}`}
                        >
                            {res.label}
                        </button>
                    );
                }
            })}
        </div>
    );
};

export default DiscussionInput;

const publisherResponse = [
    {
        label: 'Thank you, can you share image of this item?',
        value: 'share_image',
        type: 'text',
    },
    {
        label: 'Can i see more images of this item',
        value: 'more_image',
        type: 'text',
    },
    {
        label: 'I am interested, share contact',
        value: 'share_contact',
        type: 'contact',
    },
    {
        label: 'I am not interested, thank you!',
        value: 'not_interested',
        type: 'close',
    },
];
const interactorResponse = [
    {
        label: 'I have this Item',
        value: 'have_item',
        type: 'text',
    },
    {
        label: 'I know exactly where you can get this',
        value: 'know_where_to_get_item',
        type: 'text',
    },
    {
        label: 'I have something similar',
        value: 'have_something_similar',
        type: 'text',
    },
    {
        label: 'Share image',
        value: 'share_image_interactor',
        type: 'file',
    },
    {
        label: 'Share image(s)',
        value: 'more_image_interactor',
        type: 'files',
    },
];

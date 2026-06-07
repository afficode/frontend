export const publisherResponse = [
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

export const interactorResponse = [
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

const optionsMap = {
    share_image: 'Thank you, can you share image of this item?',
    more_image: 'Can i see more images of this item',
    share_contact: 'I am interested, share contact',
    not_interested: 'I am not interested, thank you!',
    have_item: 'I have this Item',
    know_where_to_get_item: 'I know exactly where you can get this',
    have_something_similar: 'I have something similar',
    share_image_interactor: 'Share image',
    more_image_interactor: 'Share image(s)',
};

const getDiscussionText = (optionValue) => {
    return optionsMap[optionValue] || optionValue;
};

export default getDiscussionText;

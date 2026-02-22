const getRemarkMessage = (remark) => {
    switch (remark) {
        case 'reschedule':
            return 'Reschedule';
        case 'confirmed':
            return 'Confirmed Date & Time.';
        case 'not_interested':
            return 'Not interested in the inspection.';
        case 'withdrawn':
            return 'Withdrawn from the site.';
        case 'not_available':
            return 'Item no longer available.';
        case 'view_contact':
            return 'You can view the contact now.';
        case 'ok':
            return 'Ok';
        default:
            return '';
    }
};

export default getRemarkMessage;

import { formatDistance } from 'date-fns';

const formatTimeAgo = (dateString) => {
    if (!dateString) {
        return '';
    }
    try {
        const timeAgo = formatDistance(new Date(new Date(dateString)), Date.now(), {
            includeSeconds: true,
            addSuffix: true,
        });

        return timeAgo.replace('about ', '');
    } catch (error) {
        return '';
    }
};

export default formatTimeAgo;

import { Approutes } from '../constants';

export function getNotificationRoute(feature, metadata, adId, userId) {
    const rules = [
        {
            match: () => feature.includes('inspection_log') && metadata?.ad_owner === userId,
            getRoute: () => `${Approutes.product.initial}/${adId}`,
        },
        {
            match: () => feature.includes('inspection_log'),
            getRoute: () => Approutes.grab.inspectionLog,
        },
        {
            match: () => feature.includes('escrow'),
            getRoute: () => Approutes.profile.transactions,
        },
        {
            match: () => feature.includes('ads'),
            getRoute: () => `${Approutes.product.initial}/${adId}`,
        },
        {
            match: () => feature.includes('message'),
            getRoute: () => Approutes.profile.messages,
        },
        {
            match: () => feature.includes('request'),
            getRoute: () => `${Approutes.requests.interactions}?d=${metadata?.interaction_id}`,
        },
    ];

    return rules.find((r) => r.match())?.getRoute() ?? null;
}

export function getNotificationBadgeColor(feature) {
    if (feature.includes('escrow_refund_resolved')) return 'bg-green-500';
    if (feature.includes('inspection_log')) return 'bg-purple-500';
    if (feature.includes('message')) return 'bg-blue-500';
    if (feature.includes('escrow_refund')) return 'bg-orange-500';
    if (feature.includes('request')) return 'bg-secondary !text-black';
    return 'bg-green-500';
}

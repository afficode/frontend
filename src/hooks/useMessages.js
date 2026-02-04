import { useMutation, useQuery } from 'react-query';
import { privateAxios } from '../utils';

export const useMessages = (chat_id) => {
    const fetchMessages = () => privateAxios.get(`message/${chat_id}`).then((res) => res?.data);

    return useQuery(['messages', chat_id], fetchMessages, {
        refetchInterval: false,
    });
};

export const useSendMessage = () => {
    const sendMessage = (message) => privateAxios.post('message', message);

    return useMutation(['text'], sendMessage);
};

export const useChats = () => {
    const fetchChats = () => privateAxios.get('chat/').then((res) => res?.data);

    return useQuery('chats', fetchChats, {
        refetchInterval: false,
    });
};

export const createChat = () => {
    const createChat = (ad_id) => privateAxios.post('chat', ad_id);

    return useMutation(['new_chat'], createChat);
};
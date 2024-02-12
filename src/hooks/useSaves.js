import { useQuery, useMutation } from "react-query";
import { privateAxios } from "../utils";
import { backendLink } from "../constants";

export const getSaves =  () => {
    const getSaved = () => privateAxios.get(`${backendLink}ads/saves`).then((res) => res?.data);

    return useQuery("saved", getSaved);
}

export const saveAd = () => {
    const saveAd = (ads_id) => privateAxios.post(`ads/saveAd`, ads_id ).then((res) => res?.data);

    return useMutation(["saveAd"], saveAd);
}

export const unSaveAd = async ({queryKey}) => {
    const [_, ads_id] = queryKey
    return await privateAxios.get(`ads/unSaveAd?ads_id=${ads_id}`).then((res) => res?.data);
}

// DONE: Unsave all Ads
export const unSaveAll = async () => {
    return await privateAxios.get(`ads/unSaveAll`).then((res) => res?.data);
}
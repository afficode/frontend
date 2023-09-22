import axios from "axios"
import { backendLink } from "../constants";
import secureLocalStorage from "react-secure-storage";
import { setToken, setRefreshToken, setUser } from "../utils";

export const RegistrationHook = async (values, setSubmitting, endpoint) => {
    setSubmitting(true)
    let regStatus;
    await axios.post(`${backendLink}auth/${endpoint}`, values)
    .then(({data}) => {
        regStatus = data;        
    }).catch(({response}) => {
        regStatus = {success: false, ...response.data, status: response.status}        
    });
    return regStatus;
}

export const LoginHook = async (values, setSubmitting) => {
    setSubmitting(true)
    let userUpdate;
    await axios.post(`${backendLink}auth/login`, values)
    .then(({data}) => {
        console.log(data)
    if(data.success) {
            setUser(data.user);
            setToken(data.token);
            setRefreshToken(data.refreshToken);
        } 
        userUpdate = data;        
    }).catch(({response}) => {
        userUpdate = {success: false, ...response.data}        
    });
    return userUpdate;

}

export const TokenHook = async (values, endpoint, token, setSubmitting) => {
    setSubmitting !== undefined && setSubmitting(true);
    let returnData;
    await axios.post(`${backendLink}auth/${endpoint}`, values, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
        }
    })
    .then(({data}) => {
        // success data gotten
        if(data.success) {
            returnData = data;  
        }        
    }).catch(({response}) => {
        returnData = {success: false, ...response.data}        
    });

    return returnData;
}

import axios from "axios"
import { backendLink } from "../constants";
import secureLocalStorage from "react-secure-storage";

export const RegistrationHook = async (values, setSubmitting) => {
    setSubmitting(true)
    let regStatus;
    await axios.post(`${backendLink}auth/register`, values)
    .then(({data}) => {
        console.log(data)
        regStatus = data;
        
    }).catch(({response}) => {
        regStatus = {success: false, ...response.data}        
    });
    return regStatus;
}

export const LoginHook = async (values, setSubmitting) => {
    let userUpdate;
    await axios.post(`${backendLink}auth/login`, values)
    .then(({data}) => {
        // success data gotten
        console.log(data)
        if(data.success) {
            secureLocalStorage.setItem("user", data.user);
            secureLocalStorage.setItem("token", data.token);
        }        
        userUpdate = data;        
    }).catch(({response}) => {
        userUpdate = {success: false, ...response.data}        
    });
    return userUpdate;
}
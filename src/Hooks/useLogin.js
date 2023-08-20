import axios from "axios";
import { useState, useContext } from "react";
import { UserContext } from "../context/UserContextProvider";
import { backendLink } from "../utils/basicInfo";

export const useLoginIn = () => {
    const { setUser, setIsGrabber } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const login = async (formData) => {
        setIsLoading(true);
        setError(null);
        await axios.post(backendLink + "/users/login", formData, {
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            // save user informtion to localstroage
            localStorage.setItem('user', JSON.stringify(res.data));
            // update the auth context
            setUser(res.data.user)
            // set Error
            setError(null)
            // set Is Loading to alse
            setIsLoading(false)
            // set success
            setSuccess(res.data.success)
            // set grabber
            if (res.data.user.grabber_id !== null ) {
                setIsGrabber(true);
            }

            //console.log(res.data.user)
            if(res.data?.user.grabber_id && (res.data.user.grabber_id !== null)) {
                setIsGrabber(true);
            }
            ////console.log(res.data.success)
            
        }).catch(err => {
            //console.log(err)
            setIsLoading(false);
            //setError("");
            setError(err.response.data.msg)
            setSuccess(err.response.data.success)
        });

    }

    return  {login, isLoading, error, success}

}
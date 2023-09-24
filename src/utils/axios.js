import axios from "axios";
import { getRefreshToken, getToken, setToken } from "./localstorage";
import { backendLink } from "../constants";
import { Navigate } from "react-router-dom";

const api = axios.create({
  baseURL: backendLink,
});

api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, (error) => Promise.reject(error)

);

api.interceptors.response.use((response) => response, async (error) => {
  const originalRequest = error.config;
  // check if the return status is 401
  console.log("Interceptors used")
  if(error.response.status === 401 && !originalRequest._retry) {
    // set the retry parameter
    console.log("Interceptors used")
    originalRequest._retry = true
    // make a request to the refresh token api in the backend to get the api.
    try {
      const response = await axios.post(`${backendLink}auth/refresh`).then((data) =>  {
        console.log(data)
      }).catch(err => {
        console.log(err)
      })
      console.log(response)
      const { token } = response.data;
      setToken(token);
      originalRequest.headers.Authorization = `Bearer ${token}`;
      return axios(originalRequest);
    } catch (error) {
      return location.href("/auth");
    }
  }

  return Promise.reject(error);
})

export default api;

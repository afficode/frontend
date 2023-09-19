import axios from "axios";
import { getUserFromLocalStorage } from "./localstorage";

const customFetch = axios.create({
  baseURL: "http://109.237.25.252:4000/",
});

customFetch.interceptors.request.use((config) => {
  const user = getUserFromLocalStorage();
  if (user) {
    config.headers["Authorization"] = `Bearer ${user.token}`;
  }
  return config;
});

export default customFetch;

import axios from'axios';
import { backendLink } from './basicInfo';
import { getToken } from './index';

const token = getToken();
const axiosWithToken = axios.create();

axiosWithToken.defaults.baseURL = backendLink;
////console.log(getToken())
axiosWithToken.defaults.headers.common['Authorization'] = token;


export default axiosWithToken;
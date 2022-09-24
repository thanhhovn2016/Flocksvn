import axios from 'axios';

import { nextJsBaseURL } from '../utils/constants';

const axiosInstance = axios.create({
    baseURL: nextJsBaseURL,
    timeout: 15000,
    headers:{
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
});


export default axiosInstance;
import axios from 'axios';

import { baseURL, API_KEY } from '../utils/constants';
import { getLanguage } from '../utils/functions';

const lang = getLanguage();
const axiosInstance = axios.create({
    baseURL: baseURL,
    headers:{
        'Content-Type': 'application/json',
        'accept': 'application/json',
        // 'Accept-Language': lang,
        'api-key': API_KEY
    }
});


export default axiosInstance;
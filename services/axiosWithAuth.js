import axios from 'axios';

import { baseURL } from '../utils/constants';
import { getLanguage } from '../utils/functions';
import { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken, removeAccessToken, removeRefreshToken } from '../utils/storage';

const lang = getLanguage();
const access = getAccessToken();

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers:{
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Accept-Language': lang,
        'Authorization': `Bearer ${access}`
    }
});
const axiosInstanceWithOutHeader = axios.create({
    baseURL: baseURL,
    headers:{
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'Accept-Language': lang,
    }
});

axiosInstanceWithOutHeader.interceptors.response.use(
    response => response ,
    error => {
        const mainRequest = error.config;
        // console.log("error.response " , error)

        if (error.response?.status === 401 && mainRequest.url === 'auth/token/refresh/') {
            removeAccessToken();
            removeRefreshToken();
            window.location.href = '/sign-in/';
            return Promise.reject(error);
        }
        return Promise.reject(error)
    }
)
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        const mainRequest = error.config;
        // console.log("error.response " , error)

        if (error.response?.status === 401 && mainRequest.url === 'auth/token/refresh/') {
            removeAccessToken();
            removeRefreshToken();
            window.location.href = '/sign-in/';
            return Promise.reject(error);
        }

        if(error.response?.status === 401 && error.response.statusText === 'Unauthorized'){

            // if (error?.response?.data?.code === "token_not_valid"){

                const refresh_token = getRefreshToken();
               
                return axiosInstanceWithOutHeader
                    .post('auth/token/refresh/', {
                        'refresh':refresh_token
                    })
                    .then(response => {
                        setAccessToken(response.data.access);
                        if (response.data.refresh){

                            setRefreshToken(response.data.refresh);
                        }
                        axiosInstance.defaults.headers['Authorization'] = "Bearer " + response.data.access;
                        mainRequest.headers['Authorization'] = "Bearer " + response.data.access;
                        return axiosInstance(mainRequest)
                    })
                    .catch(error => {
                        // if (error?.response?.data.token)
                        console.log(error)
                    })
            // }
        }


        return Promise.reject(error)
    }
)

export default axiosInstance;
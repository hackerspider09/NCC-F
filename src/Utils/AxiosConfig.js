import axios from "axios"; 

export const API_URL = "http://20.198.81.8/"; 


export const AxiosInstance = axios.create({
    baseURL : "http://20.198.81.8",
    // withCredentials : true,
    Headers:{
        'content-type':'application/json',
    }
})

export const addAuthToken = (token) => {
    if (token) {
        AxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete AxiosInstance.defaults.headers.common['Authorization'];
    }
};
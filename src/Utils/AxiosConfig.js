import axios from "axios"; 

export const API_URL = "https://api.ncc.ctd.credenz.in/"; 


export const AxiosInstance = axios.create({
    baseURL : "https://api.ncc.ctd.credenz.in/",
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
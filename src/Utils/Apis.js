import axios from "axios"; 
  

export const APIURL  = () => { 
    return "http://20.198.81.8";
} 




export const createrating  = (data) => { 
    return axios 
    .post("/api/rating/",data) 
    .then((response)=> {
         return response.data;
    }) 
    .catch((error)=>{ 
        // console.log(error);
    }) 
     
   
}; 
 
export const  listrating  = () => { 
    return axiosInstance.get("/api/ratings/"); 
     
   
}  
 
export const listquetions  = () => { 
    return axiosInstance.get("/api/quetions/"); 
     
    
} 
 
export const retrievequetions = () => { 
    return axiosInstance.get("/api/quetions/{id}/"); 
     
    
} 
 
export const juniorleaderboard   = () => {
     return axiosInstance.get("/api/leaderboard/"); 
     
} 
 
export const listsubmissions = () => { 
    return axiosInstance.get("/api/submissions/");
    // return axiosInstance.get("/api/submissions?question=25555"); 
    

}
 
export const submitcode = (data) => { 
    return axiosInstance.post("/api/submit/",data); 
          
    
} 
 
export const userlogin = (data) => { 
    return axiosInstance.post("/api/login/",data); 
      
}



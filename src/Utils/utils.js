import { AxiosInstance } from './AxiosConfig';

export const setToken = (userToken) =>{
    localStorage.setItem("token",userToken);
}


export const getToken = () =>{
    const token = localStorage.getItem("token");
    if (token !== null){
        return token;
    }
    return token;
}


export const isTimeOver =()=>{

   var countDown;
    const now = new Date().getTime();

    AxiosInstance.get("/api/gettime/")
            .then((response) => {
                // console.log("enter in then ");
                // console.log(response.data);
                // console.log(response.data[0].endTime);
                // const dateTime = new Date(response.data[0].endTime);
                // const hours = dateTime.getUTCHours();
                // const minutes = dateTime.getUTCMinutes();
                // const seconds = dateTime.getUTCSeconds();
                // const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                // settargetTime(response.data[0].endTime);
                countDown = new Date(response.data[0].endTime).getTime();
                
            })
            .catch((error) => {
                
                // console.log("enter in error ",error);

            });

    
    // console.log(new Date())
    var remain = countDown - now;
    // console.log("timeisover ",remain); 
    if (parseInt(remain) < 0){
      return true;
    }else{
        return false;
    }
  }
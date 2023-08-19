import React, { useState, useEffect } from 'react';
import { AxiosInstance } from '../../Utils/AxiosConfig';
// import { useHistory } from 'react-router-dom';
import { redirect } from "react-router-dom";

const CountdownRedirect = () => {
//   const targetTime = new Date('2023-08-29T19:51:49+05:30'); // Replace with your target time
  const [targetTime, settargetTime] = useState(0);
  const [remainingTime, setRemainingTime] = useState(getTimeDifference(targetTime));
//   const history = useHistory();




  useEffect(()=>{
    AxiosInstance.get("/api/gettime/")
            .then((response) => {
                console.log("enter in then ");
                console.log(response.data);
                console.log(response.data[0].endTime);
                // const dateTime = new Date(response.data[0].endTime);
                // const hours = dateTime.getUTCHours();
                // const minutes = dateTime.getUTCMinutes();
                // const seconds = dateTime.getUTCSeconds();
                // const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                settargetTime(response.data[0].endTime);
            })
            .catch((error) => {
                
                console.log("enter in error ",error);

            })
  },[]);


  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const timeDifference = getTimeDifference(targetTime);
      const targettime = new Date(targetTime)

      // if (now > targetTime || now.getDate() !== getDate(targetTime.) ) {
      //   // Redirect if the time has ended and the day is not the same
      //   // history.push('/new-route'); // Replace with your desired route
      //   console.log("dfsdf")
      //   redirect("/leaderboard")
      // } else {
      //   console.log("Dfs")
      //   setRemainingTime(timeDifference);
      // }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [targetTime]);

  return (
    <div>
      <p>Time : {remainingTime}</p>
    </div>
  );
};

// Helper function to calculate time difference
const getTimeDifference = (targetTime) => {


    const countDown = new Date(targetTime).getTime();
    const now = new Date().getTime();
    // console.log(new Date())
    let remain = countDown - now;
    // console.log(remain);
    if (remain < 0) {
        redirect("/leaderboard");
    }
    return `00 : 00 : 00`;


    let seconds = Math.floor((remain / 1000) % 60);
    let minutes = Math.floor((remain / (1000 * 60)) % 60);
    let hours = Math.floor((remain / (1000 * 60*60)) % 60);
   
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;




//   const currentTime = new Date(targetTime);
//   const timeDifference = targetTime - currentTime;
//   const seconds = Math.floor(timeDifference / 1000);

//   const hours = Math.floor(seconds / 3600);
//   const minutes = Math.floor((seconds % 3600) / 60);
//   const remainingSeconds = seconds % 60;
// console.log(`${hours}h ${minutes}m ${remainingSeconds}s`)
  return `${hours} : ${minutes} : ${seconds}`;
};

export default CountdownRedirect;

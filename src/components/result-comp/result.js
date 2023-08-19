import React from 'react'
import "./result.css";
import { useEffect,useState } from "react";
import { AxiosInstance ,addAuthToken} from '../../Utils/AxiosConfig';
import { getToken} from '../../Utils/utils';


const endPoint = "/api/result/" 


const Result = () => {
  const [Resultdata,setResultData] = useState();
  const [top6,setTop6] = useState([]);  

  

  useEffect(()=>{
    addAuthToken(getToken());
    AxiosInstance.get(endPoint)
            .then((response) => {
                console.log("enter in then ");
                if (response.status) {
                    console.log("enter in then if ");
                    // console.log(response.data);
                    var personalR = response.data.personalRank;
                    var top6R = response.data.top6;
                    setResultData(Resultdata => ({
                      ...Resultdata,
                      ...personalR
                    }));
                    setTop6(top6 => ({
                      ...top6,
                      ...top6R
                    }));
                    


                }
                else {
                    
                    console.log("Error In fetch");
                }
            })
            .catch((error) => {
                
                console.log("enter in error ",error);

            })
  },[]);


  const getFormatedTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    
    return formattedTime // Display formatted time in h:mm:ss format
  }


  return ( 
    <>
       <div className="contain">
       <div className="result">
        <h1 className="resulttitle">Your Results</h1>
          <div className="user_profile">
              <div className="profile">
                <div className="profilepic">
                  A
                </div>
                <p className="name">{Resultdata?.user1}</p>
              </div>

              <div className="score">
                {/* <!-- <p className="scoreitem">Rank : 5</p>
                <p className="scoreitem">Score: 10/10</p> --> */}
                <table className="tbles">
                  <thead>
                    <th>
                      Rank
                    </th>
                    <th>
                      Score
                    </th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        {Resultdata?.rank}
                      </td>
                      <td>
                      {Resultdata?.score}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table className="tbles">
                  <thead>
                    <th>
                      Questions 
                      Attempted
                    </th>
                    <th>
                      Questions 
                      Asked
                    </th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        7
                      </td>
                      <td>
                        7
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/* <!-- <p className="scoreitem">Questions Attempted: 7</p>
                <p className="scoreitem">Questions Asked: 7</p> --> */}
              </div>
          </div>
          {/* <!-- <div className="statistics">
                     
          </div>   --> */}
       </div>
       <div className="leaderboard">

             <div className="leaderhead">
              <h1>WINNERS</h1>
             </div>       
             <div className="top3">
                  <div className="card1" id="card1">
                    <div className="circle">
                       <h2 className="place">2 </h2>
                    </div>
                    <div className="content">
                      
                      <p>2nd</p>
                      <p>{top6?.[1]?.user1}</p>
                      <p>Score: {top6?.[1]?.score}</p> 
                    </div>
                  </div>

                  <div className="card1" id="card2">
                    <div className="circle">
                      
                        <h2 className="place">1</h2>
                    </div>
                    <div className="content">
                       <p>1st</p>
                       <p>{top6?.[0]?.user1}</p>
                       <p>Score: {top6?.[0]?.score}</p>
                    </div>
                  </div>

                  <div className="card1" id="card3">
                    <div className="circle">
                        <h2 className="place">3</h2>
                    </div>
                    <div className="content">
                      <p>3rd</p>
                      <p>{top6?.[2]?.user1}</p>
                      <p>Score: {top6?.[2]?.score}</p>
                    </div>
                  </div>
             </div>
             <div className="top6">
                <div className="tble">
                    <table className="leader-table table table-hover" id="myTable" bgcolor = "#2E363B">
                      <thead>
                        <tr className="headers" bgcolor="#13303E">
                          <th scope="col" className="userb">Rank</th>
                          <th scope="col" className="userb">Name</th>
                          <th scope="col" className="userb">Score</th>
                          {/* <th scope="col" className="userb">Attempts</th> */}
                          <th scope="col" className="userb">Time</th>
                        </tr>
                      </thead>
                      <tbody id="myTable">
                      
                        <tr className="usera" >
                          <td>{top6?.[3]?.rank}</td>
                          <td>{top6?.[3]?.user1}</td>
                          <td>{top6?.[3]?.score}</td>
                          <td>{getFormatedTime(top6?.[3]?.lastUpdate)}</td>
                        </tr>
                        <tr className="usera" >
                          <td>{top6?.[4]?.rank}</td>
                          <td>{top6?.[4]?.user1}</td>
                          <td>{top6?.[4]?.score}</td>
                          <td>{getFormatedTime(top6?.[4]?.lastUpdate)}</td>
                        </tr>
                        <tr className="usera" >
                          <td>{top6?.[5]?.rank}</td>
                          <td>{top6?.[5]?.user1}</td>
                          <td>{top6?.[5]?.score}</td>
                          <td>{getFormatedTime(top6?.[5]?.lastUpdate)}</td>
                        </tr>
                     
                       </tbody>
                    </table>
                </div>
             </div>
       </div> 
    </div>
    </>
   );
}
 
export default Result;
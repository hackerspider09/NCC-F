import React, { useEffect, useState } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'datatables.net-dt/css/jquery.dataTables.min.css';
import DataTable from "react-data-table-component";  
import "./leaderboard.css";
import { AxiosInstance ,addAuthToken} from '../../Utils/AxiosConfig';
import { getToken} from '../../Utils/utils';

import LoaderComponent from "../loader/loader"; 

const endPoint = "/api/leaderboard/";
var data={};
// var data1={};
const Leaderboard = () => {
  const [loading, setLoading] = useState(false);

  const [dataSet, setDataSet] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(()=>{
    setLoading(true);
    addAuthToken(getToken());
    AxiosInstance.get(endPoint)
            .then((response) => {
                // console.log("enter in then ");
                if (response.status) {
                    // console.log("enter in then if ");
                    data = response.data;
                    if (localStorage.getItem("isJunior")){
                      // console.log("junior")
                      var jdata = data.juniorLeaderboard;
                    }else{
                      // console.log("senior")
                       jdata = data.seniorLeaderboard;
                    }
                    // console.log(data);
                    // console.log(jdata);
                    
                    // console.log(typeof(data));
                    // console.log(typeof(jdata));
                    // console.log(Object.values(jdata));
                    // console.log(typeof(Object.values(jdata)));
                    
                    
                    setDataSet(jdata);

                    // console.log("data ",typeof(dataSet));
                    // console.log(dataSet);
                    setTimeout(()=>{
                      setLoading(false);

                    },2000);
                    // console.log(response.data.juniorLeaderboard);

                }
                else {
                    
                    // console.log("Error In fetch");
                }
            })
            .catch((error) => {
              console.clear();
                // console.log("enter in error ",error);

            })
  },[]);


  // const fetchedData = [
  //   {
  //     rank: "1",
  //     username: "Shreya",
  //     q1: "100",
  //     q2: "-",
  //     q3: "100",
  //     q4: "100",
  //     q5: "100",
  //     score: "400",
  //   },
  // ];

  const columns = [
    { name: "Rank",  selector: (row, i) => row['rank'], sortable: true },
    { name: "Username", selector: (row, i) => row['user1'], sortable: true },
    { name: "Q1", selector: "questionSolvedByUser.Q1", sortable: true },
    { name: "Q2", selector: "questionSolvedByUser.Q2", sortable: true },
    { name: "Q3", selector: "questionSolvedByUser.Q3", sortable: true },
    { name: "Q4", selector: "questionSolvedByUser.Q4", sortable: true },
    { name: "Q5", selector: "questionSolvedByUser.Q5", sortable: true },
    { name: "Time", selector: "lastUpdate", sortable: true ,format: row => {
      const dateTime = new Date(row.lastUpdate);
      const hours = dateTime.getUTCHours();
      const minutes = dateTime.getUTCMinutes();
      const seconds = dateTime.getUTCSeconds();  
      const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      return timeString;
    },},
    { name: "Score", selector: "score", sortable: true },
  ];

  return (
    <>
    <body>
      <div> {loading && <LoaderComponent show={true} />}</div>
      <div className="row rawdat">
        <h1 className="mt-3 mb-2 text-center">Leaderboard</h1>
        <div className="searchFunc">
        <input className="searchFunc2 px-3 py-2  mx-5" 
            type="text"
             value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by UserName..."
        />
        </div>
        <div className="Hello px-5">
          <DataTable

            columns={columns}
          
            data={dataSet.filter((item) =>
               item.user1.toLowerCase().includes(searchQuery.toLowerCase())
            )}
            pagination
            highlightOnHover
            responsive
            className="leaderboardtable"
          />
        </div>
      </div>
    
    </body>
    </>

  );
};

export default Leaderboard;

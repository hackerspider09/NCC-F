import React, { useEffect, useState } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'datatables.net-dt/css/jquery.dataTables.min.css';
import DataTable from "react-data-table-component";
import "./leaderboard.css";
import { AxiosInstance ,addAuthToken} from '../../Utils/AxiosConfig';
import { getToken} from '../../Utils/utils';
const endPoint = "/api/leaderboard/";
var data={};
// var data1={};
const Leaderboard = () => {
  const [dataSet, setDataSet] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(()=>{
    addAuthToken(getToken());
    AxiosInstance.get(endPoint)
            .then((response) => {
                console.log("enter in then ");
                if (response.status) {
                    console.log("enter in then if ");
                    data = response.data;
                    if (localStorage.getItem("isJunior")){
                      console.log("junior")
                      var jdata = data.juniorLeaderboard;
                    }else{
                      console.log("senior")
                      var jdata = data.seniorLeaderboard;
                    }
                    console.log(data);
                    // console.log(jdata);
                    
                    // console.log(typeof(data));
                    // console.log(typeof(jdata));
                    // console.log(Object.values(jdata));
                    // console.log(typeof(Object.values(jdata)));
                    
                    
                    setDataSet(jdata);

                    console.log("data ",typeof(dataSet));
                    console.log(dataSet);
                    // console.log(response.data.juniorLeaderboard);

                }
                else {
                    
                    console.log("Error In fetch");
                }
            })
            .catch((error) => {
                
                console.log("enter in error ",error);

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
    { name: "Rank", selector: "rank", sortable: true },
    { name: "Username", selector: "user1", sortable: true },
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
    <div className="container">
      <div className="row">
        <h1 className="mt-4 mb-3">Leaderboard</h1>
        <div className="searchFunc">
        <input className="searchFunc2"
            type="text"
             value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by UserName..."
        />
        </div>
        <div className="Hello">
          <DataTable

            columns={columns}
          
            data={dataSet.filter((item) =>
               item.user1.toLowerCase().includes(searchQuery.toLowerCase())
            )}
            pagination
            highlightOnHover
            responsive
            className="col custom-table"
          />
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;

import React,{useEffect,useState} from 'react';
import './quescards.css'; // Import your custom CSS
import { Link } from 'react-router-dom'
import { AxiosInstance ,addAuthToken} from '../../Utils/AxiosConfig';
import { getToken} from '../../Utils/utils';
import { BsCheck2Circle } from 'react-icons/bs';
// import {  toast } from 'react-toastify';
// import LoaderComponent from "../loader/loader"; 
// import Graph from "../Graph/graph"

const endPoint = "/api/questions/"

const tasks = [
  
];

function App() {
  // const nav = useNavigate();
  // const [loading, setLoading] = useState(false);
const [Qdata, setQdata] = useState(tasks);
  useEffect(()=>{
   
    // setLoading(true);
    
    addAuthToken(getToken());
    AxiosInstance.get(endPoint)
            .then((response) => {
                // console.log("enter in then ");
                if (response.status) {
                    // console.log("enter in then if ");
                    // console.log(response.data);
                    setQdata(response.data)
                    const questionDetails = {};
                  for(let i = 1; i <=response.data.length; i++) {
                    
                       questionDetails[i] = response.data[i-1].questionId;

                   }
                   localStorage.setItem("qdata",JSON.stringify(questionDetails));
                  //  setTimeout(()=>{
                    // setLoading(false);

                  // },5000);
                  }
                else {
                  // console.log("Error In fetch");
                }
              })
              .catch((error) => {
                // nav("/question");
              // console.log("enter in error ",error);
              console.clear();


            })


  },[]);


  // const buttonStyle = {
  //   backgroundColor: Qdata.solvedByTeam ? 'green' : '#0e0758', // Change colors as needed
  //   color: 'white', // Text color
  //   // Add other styles you want to apply
  // };



  const rows = Qdata.map(task => (
    <div className="card" key={task.questionId}>
      <p className="thwala"> {task.title}</p>
      <div className="thwala" id="progress">
        <div className="progress" style={{ height: '25px' }}>
          <div
            className="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            style={{ width: `${task.accuracy}%` }}
            aria-valuenow={task.accuracy}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {task.accuracy}%
          </div>
        </div>
      </div>
      <div className="thwala">
    <button
      type="button"
      className={`btn btn-primary btn-sm `}
      data-bs-toggle="modal"
      data-bs-target="#myModal"
    >
      <Link to={`/question/${task.questionId}`}>
        {task.solvedByTeam ? "SOLVED" : "SOLVE"} 
        <span> {task.solvedByTeam ? <BsCheck2Circle/>  : ""} </span>
      </Link>
    </button>
  </div>

    </div>
  ));

 
  

  return (
    <>
    {/* <Graph  shouldAddNumber={true}/> */}
    {/* <div> {loading && <Graph  shouldAddNumber={loading}/> }</div> */}
      {/* ...Navbar and other components */}
      <div className="backgr">
      <div className="Heading">
        <h2>Questions</h2>
      </div>
      
        <table className="question-table table table-responsive-sm question-container">
          <tbody>
            <div className="badadiv">{rows}</div>
          </tbody>
        </table>
      </div>

      {/* ...Footer and other components */}
    </>
  );
}

export default App;

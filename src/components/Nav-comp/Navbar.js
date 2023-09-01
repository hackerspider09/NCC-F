import {React,useState,useEffect} from 'react'
import './Navbar.css'
import revb from './revb.svg'
import Instruct from "../instruct-comp/instruct";
import { NavLink,Navigate,redirect,useNavigate} from "react-router-dom";
// import Redirect  from 'react-redirect';
import Codingpage from "../codingpage-comp/codingpage";
import Submission from "../submission-comp/submission";
import Leaderboard from "../leaderb-comp/leaderboard";
import Result from "../result-comp/result";   //ye nahi hai navbar mai
import { Link, useLocation } from 'react-router-dom';
import Quescards from "../quescard-comp/quescards";
import Login from "../loginpage-comp/login";
import { AxiosInstance } from '../../Utils/AxiosConfig';
// import QuestionHubPage from "./components/test_component/hello69";
import CountdownRedirect from "./timer"
export default function Navbar() {
  const nav = useNavigate();

  const location = useLocation();
  const [currentPage, setCurrentPage] = useState('coding'); // Default to coding page

  
  const [loggedIn, setLoggedIn] = useState(false);


  // Check local storage for login status on initial load
  useEffect(() => {
    const userIsLoggedIn = localStorage.getItem('isLogin') === 'true';

    setLoggedIn(userIsLoggedIn);
  }, []);


  

  // const hours = data.getUTCHours();
  // const minutes = data.getUTCMinutes();
  // const seconds = data.getUTCSeconds();
  // const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // Update the total seconds every second
 

  // Update the currentPage state based on the current pathname
  // useEffect(() => {
  //   const pathname = location.pathname;
  //   if (pathname === '/question/c296c' || pathname === '/question/c65e6'|| pathname === '/question/f3143'|| pathname === '/question/d6b92'|| pathname === '/question/97ae4'
  //   || pathname === '/question/791f3'|| pathname === '/question/5f49d'|| pathname === '/question/3429c') {
  //     setCurrentPage('coding');
  //   } else if (pathname === '/question') {
  //     setCurrentPage('questionhub');
  //   } else if (pathname === '/leaderboard') {
  //     setCurrentPage('leaderboard');
  //   }
  // });


  const handleLogout = () => {
    localStorage.clear();
    setLoggedIn(false);
    // <Navigate to = "/" />
    // Redirect("/")
    // Redirect("/login");
    nav("/");
    window.location.reload(true);
  };





  return (
    <>
   
    <nav className="navbar navbar-expand-lg navbarr">
    <div className="container-fluid">
    
        {/* <a
            className="navbar-brand navvi pisblogo"
            href="https://ctd.credenz.in"
          
            style={{padding: 0, marginLeft : 20}}
            ><img src="https://i.postimg.cc/yNMmy6CD/ctdlogo.png" alt="PISBLogo" height="30px"
            // ><img src="images/pisblogo.png" alt="PISBLogo" height="30px"
          /></a> */}
      <div>
        <a
            className="navbar-brand navvi pisblogo"
            href="https://ctd.credenz.in"
          
            style={{padding: 0, marginLeft : 20}}
            ><img src="https://i.postimg.cc/HsPn6YrQ/NCC-2.png" alt="PISBLogo" className='img-style'  /></a>
    </div>
   
    
      
      

    <div className="Btn-div">

          <p className="mb-0">{loggedIn && localStorage.getItem("contractAccept") ?  < CountdownRedirect /> :" "} </p>
      

            <ul> { loggedIn && localStorage.getItem("contractAccept") ? <Link to="/question"  className='nav-link' >QuestionHub</Link> : "" } </ul>
            <ul> { loggedIn ? <Link to="/leaderboard"  className='nav-link' >Leaderboard</Link> : "" } </ul>
            <ul> {loggedIn && (<button onClick={handleLogout} className = "btn border border-white rounded text-light btnlog">Log Out</button>)} </ul>
    </div>
     
        
      
    
    </div>
  </nav>

    </>
    
  )
}

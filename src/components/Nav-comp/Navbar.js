import {React,useState,useEffect} from 'react'
import './Navbar.css'
import revb from './revb.svg'
import Instruct from "../instruct-comp/instruct";
import { NavLink } from "react-router-dom";
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


  const location = useLocation();
  const [currentPage, setCurrentPage] = useState('coding'); // Default to coding page

  

  

  // const hours = data.getUTCHours();
  // const minutes = data.getUTCMinutes();
  // const seconds = data.getUTCSeconds();
  // const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // Update the total seconds every second
 

  // Update the currentPage state based on the current pathname
  useEffect(() => {
    const pathname = location.pathname;
    if (pathname === '/question/c296c' || pathname === '/question/c65e6'|| pathname === '/question/f3143'|| pathname === '/question/d6b92'|| pathname === '/question/97ae4'
    || pathname === '/question/791f3'|| pathname === '/question/5f49d'|| pathname === '/question/3429c') {
      setCurrentPage('coding');
    } else if (pathname === '/question') {
      setCurrentPage('questionhub');
    } else if (pathname === '/leaderboard') {
      setCurrentPage('leaderboard');
    }
  });


  return (
    <>
   
    <nav className="navbar navbar-expand-lg navbarr">
    <div className="container-fluid">

    <a
        className="navbar-brand navvi pisblogo"
        href="https://pictieee.in"
       
        style={{padding: 0, marginLeft : 20}}
        ><img src="images/pisblogo.png" alt="PISBLogo" height="30px"
      /></a>
      
      <a className="navbar-brand navvi" href="https://credenz.in" style={{padding: 0}}
        ><img src={revb} alt="Clash Logo" className='logo'
      /></a>

    <div>
    <ul className="navbar-nav ms-auto">
      {currentPage ==='coding'&&(

     <>
          <Link to="/question" className='nav-link'>QuestionHub</Link>
          <Link to="/leaderboard" className='nav-link'>Leaderboard</Link>
     </>
                


      )}
            
            {currentPage === 'questionhub' && (
        <>
          {/* <Link to="/questionhubpage">QuestionHub</Link> */}
          <Link to="/leaderboard"   className='nav-link'>Leaderboard</Link>
        </>
      )}
            
            {currentPage === 'leaderboard' && (
        <>
          {/* <Link to="/codingpage">QuestionHub</Link> */}
          <Link to="/question"  className='nav-link' >QuestionHub</Link>
        </>
      )} 
              
    
           
            </ul>
    </div>
     
    <div className="timer">
         <CountdownRedirect />
      </div>

     
    </div>
  </nav>

    </>
    
  )
}

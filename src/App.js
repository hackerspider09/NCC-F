import React, { useState, useEffect } from 'react';

import {BrowserRouter,Route, Routes ,Navigate} from "react-router-dom";
import Navbar from "./components/Nav-comp/Navbar";
import './App.css';
import Instruct from "./components/instruct-comp/instruct";

import Codingpage from "./components/codingpage-comp/codingpage";
// import Submission from "./components/submission-comp/submission";
import Leaderboard from "./components/leaderb-comp/leaderboard";
import Result from "./components/result-comp/result";
import Footer from "./components/footer-comp/footer";
import Quescards from "./components/quescard-comp/quescards";
import Login from "./components/loginpage-comp/login";
// import QuestionHubPage from "./components/test_component/hello69";
// import axios from "./components/axios";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {isTimeOver} from './Utils/utils';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [accessExpired, setAccessExpired] = useState(false);
  const [IsAccepted, setIsAccepted] = useState(false);

  // Check local storage for login status on initial load
  useEffect(() => {
    const userIsLoggedIn = localStorage.getItem('isLogin') === 'true';
    const contractAccept = localStorage.getItem('contractAccept') === 'true';
    // console.log("cecking ",userIsLoggedIn);

    setLoggedIn(userIsLoggedIn);
    setIsAccepted(contractAccept);

    setAccessExpired(isTimeOver());
  }, []);
  // }, [loggedIn,accessExpired]);


  // const handleLogout = () => {
  //   localStorage.removeItem('isLoggedIn');
  //   setLoggedIn(false);
  // };


  return (
    <BrowserRouter>
    <div>
      <div>
        <Navbar />
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div>

        <Routes>
          <Route path="/" element={loggedIn  ? IsAccepted ? <Navigate to="/question" /> : <Navigate to="/instruction" /> : <Login />} />
          <Route path="/login" element={loggedIn  ? IsAccepted ? <Navigate to="/question" /> : <Navigate to="/instruction" /> : <Login />} />
          <Route path="/instruction" element={loggedIn && !accessExpired && !IsAccepted ?  <Instruct />  : loggedIn && IsAccepted ? <Navigate to="/question" /> : <Navigate to="/" />} />
          <Route path="/result" element={ loggedIn && !accessExpired ? <Quescards /> : loggedIn ? <Result /> : <Navigate to="/" />} />
          {/* <Route path="/result" element={ <Result />} /> */}
          <Route path="/question" element={loggedIn && !accessExpired ? <Quescards /> : <Navigate to="/" />} />
          <Route path="/leaderboard" element={loggedIn && !accessExpired ? <Leaderboard /> : <Navigate to="/" />} />
          {/* <Route path="/submission" element={<Submission/>} /> */}
          <Route path="/question/:questionId" element={<Codingpage/>} />
          {/* <Route path="/test" element={<QuestionHubPage/>} /> */}
        </Routes>
    
      </div>
      <div>
        <Footer/>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;

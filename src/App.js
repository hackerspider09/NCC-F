import {BrowserRouter,Route, Routes } from "react-router-dom";
import Navbar from "./components/Nav-comp/Navbar";
import './App.css';
import Instruct from "./components/instruct-comp/instruct";

import Codingpage from "./components/codingpage-comp/codingpage";
import Submission from "./components/submission-comp/submission";
import Leaderboard from "./components/leaderb-comp/leaderboard";
import Result from "./components/result-comp/result";
import Footer from "./components/footer-comp/footer";
import Quescards from "./components/quescard-comp/quescards";
import Login from "./components/loginpage-comp/login";
import QuestionHubPage from "./components/test_component/hello69";
// import axios from "./components/axios";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {

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
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/instruction" element={<Instruct />} />
          <Route path="/result" element={<Result />} />
          <Route path="/question" element={<Quescards />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          {/* <Route path="/submission" element={<Submission/>} /> */}
          <Route path="/question/:questionId" element={<Codingpage/>} />
          <Route path="/test" element={<QuestionHubPage/>} />
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

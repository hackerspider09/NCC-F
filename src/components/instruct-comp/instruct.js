import React, { useState } from 'react';
import './instructs.css';

import { Link } from 'react-router-dom'


function Instruct() {
  const [termsChecked, setTermsChecked] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const instructions = [ 
    "This round comprises of 6 questions. All the questions have marking scheme +100 for correct answers.",
    "Please play the game in Full Screen (Fn + F11) for better resolution."
  ];

  const handleTermsChange = () => {
    setTermsChecked(!termsChecked);
    setIsButtonEnabled(!isButtonEnabled);
}

const btnstyle = {
  textDecoration: "none",
  color: "#ffffff",
}


  return (
    <div className="container">
      <div className="row align">
        <div className="col-1 col-sm-1 col-md-2 col-lg-2 col-xl-2 col-xxl-2"></div>
        <div className="col-10 col-sm-10 col-md-8 col-lg-8 col-xl-8 col-xxl-8">
          <div className="heading instr">
            <h3 className="title">INSTRUCTIONS</h3>
          </div>
          <div className="scrollon" id="style-8">
            {instructions.map((instruction, index) => (
              <div className="outerbox" key={index}>
                <div className="infobox">{instruction}</div>
                <div className={`numbox ${index + 1}`}>{String(index + 1).padStart(2, '0')}</div>
              </div>
            ))}
          </div>
          <div>
            <form action="" method="post">
              <div className="form-check checkboxouter">
                <input
                  className="form-check-input checkbox"
                  type="checkbox"
                  value="checked"
                  id="flexCheckDefault"
                  name="checked"
                  checked={termsChecked}
                  onChange={handleTermsChange}
                  
                  required
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  I have read all the instructions carefully.
                </label>
              </div>
              <div className="buttonboxouter" >
                <button 
                  type="submit"
                  // className={termsChecked ? 'enabled' : 'disabled'}
                  className={termsChecked? 'button':'proceed'}
              
                  id="submit_button"
                  name="submitbutton"
                  disabled={!isButtonEnabled} 
                  onClick={() => localStorage.setItem("contractAccept", true)}
                >
                  <Link to="/question/" style={btnstyle}> Proceed</Link>
                  
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-1 col-sm-1 col-md-2 col-lg-2 col-xl-2 col-xxl-2"></div>
      </div>
    </div>
  );
}

export default Instruct;

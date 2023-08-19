import React ,{useState,useEffect } from 'react'
import './consolecontent.css';
import TextField from '@mui/material/TextField';
import { BsCheck2Circle } from 'react-icons/bs';
import { RxCrossCircled } from 'react-icons/rx';
import {  toast } from 'react-toastify';


export default function Consolecontent({ isSubmit, data,codeInput,changedData, onDataChange , onTextFieldChange}) {
  const [code, setCode] = useState({});
  const [IsSubmitted, setIsSubmitted] = useState(false);
  const [sampleInput, setsampleInput] = useState(false);
  const [allAC, setallAC] = useState(false);

  useEffect(()=>{
    setCode(data);
    setCode(changedData);
    setsampleInput(codeInput)
    console.log("code  ",sampleInput)
    console.log("code  ",code)
    console.log("data  ",typeof(data))
    console.log("data  ",data)
    console.log("change dat a ",changedData)
  },[data])

  useEffect(() => {
    if (changedData !== null) {
      // console.log("dsfsd ",code)
      setCode(changedData); // Update localData when changedData changes
    }
    if (isSubmit) {
      setIsSubmitted(true);
    }
    setsampleInput(codeInput)

    
  }, [changedData]);




  const checkAllAC = () => {
    const allACC = Object.values(code).every(testCase => testCase.status === "AC");
    if (allACC) {
      // Run your function here
      console.log("All statuses are AC");
      setallAC(true);
    }else{

      console.log("All  are AC");
    }
    if (allAC) {
      // Show a notification using react-toastify
      toast.success("All test cases are AC and submitted!");
    }
    
  };



//to get input to different comp
  const handleInputChange = (event) => {
    const newValue = event.target.value;
    onTextFieldChange(newValue); // Call the callback with the new value
  };


  const statusColors = {
    "AC": "green", // Define the color for "AC" status
    "WA": "red",   // Define the color for other status, e.g., "WA"
    "CE": "yellow",
  };

  
  

  return (
    <div className="chaljabhai" id="test-cases">
    <h3> TEST-CASES</h3>

    <div className="consoleBlocks"> 

       <div className="block1 blockInsideconsoleblock">
        {/* <h5>input {code.error}</h5> */}
        <TextField
          id="filled-multiline-static"
          label="Input"
          color="secondary"
          multiline
          rows={4}
          defaultValue={code?.input !== "" ? codeInput : ""}
          variant="filled"
          focused
          inputProps={{ style: { color: "white" } }}
          onChange={handleInputChange}
        />

      </div>


       <div className="block2 blockInsideconsoleblock">
        <TextField
            id="filled-multiline-static"
            label="Output"
            multiline
            rows={4}
            defaultValue={code?.error !== "" ? (
              code?.error
            ) : (
              code.output
            )}
            variant="filled"
            focused
            inputProps={{ style: { color: "white" } }}
          />
      </div> 

    </div>
        {IsSubmitted ? (
              <div className="Status">
      <div className="overallStatus">
        Answer is {allAC ? "Correct" :"Failed"}.
      </div>
       <div className="alltext d-flex flex-wrap ">

              {/* <div className="test d-flex mx-3"> Test Case 4 <ion-icon name="checkmark-circle-outline" className="mx-3 my-1"
              size="large"></ion-icon></div> */}

          {Object.entries(code).map(([testCaseName, testCaseData]) => (
                  

                  <div className="test d-flex mx-3" key={testCaseName}  style={{ color: statusColors[testCaseData.status] }}>
                    {testCaseName} &nbsp; {testCaseData.status} &nbsp; {testCaseData.status === "AC" ? <BsCheck2Circle/> : <RxCrossCircled/>}
                  </div>
                ))}
          </div> 
      </div>
            ) : (
              ""
            )}


            {/* {IsSubmitted ? checkAllAC() : ""} */}
      
  </div>
  )
}

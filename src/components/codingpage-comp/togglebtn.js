import React, { useState } from 'react';
import Submission from "../submission-comp/submission"
import "./tinymce.css"
import HtmlReactParser from 'html-react-parser'
const QuestionHubPage = (props) => {
  const [viewType, setViewType] = useState('question'); // Default to showing questions

  return (
    <div>
      <div>
        <button onClick={() => setViewType('question')}  class="console-btn  btn-outline-dark">Question</button>
        <button onClick={() => setViewType('submissions')}  class="console-btn  btn-outline-dark">Submissions</button>
      </div>
      {viewType === 'question' ? <QuestionDetailSection QuesData={props.QuesData}/> : <SubmissionsSection questionId={props.QuesData.questionId} />}
    </div>
  );
};

const QuestionDetailSection = (props) => {
  // Your question detail section JSX
  return (
    <div className="question-sec">
      {/* {QuesData.map((item) => (
        <Question key={question.questionId} questionData={question} />
      ))} */}
        <div className="que-name">
          
          <h2> {props.QuesData.title} </h2>
          
        </div>
        <div className="quepart que-description" Style="height: auto;">
          {/* <h4>Description</h4> */}
          {HtmlReactParser(String(props.QuesData.description))}
          
          <h4>Input Format</h4>
           {HtmlReactParser(String(props.QuesData.ipFormate))}


       <h4>Output Format</h4>{"\n"}
       {HtmlReactParser(String(props.QuesData.sampleOp))}


       <h4>Sample Input</h4>{"\n"}
       {HtmlReactParser(String(props.QuesData.sampleIp))}
       <h4>Sample Output</h4>{"\n"}
       {HtmlReactParser(String(props.QuesData.sampleOp))}
          
         
        
          <h3>Question Constraints</h3>{"\n"}
          {HtmlReactParser(String(props.QuesData.constraints))}
         

          <h3>Author</h3>{"\n"}
          <p>{props.QuesData.author}
          </p>{"\n"}

          <h3>Points</h3>{"\n"}
          <p>{props.QuesData.points}
          </p>{"\n"}
      </div>
      {/* <div className="iop">
        <div className="rc-input-output">
          <div className="inputrc">
            <h6>INPUT</h6>
            <textarea></textarea>
          </div>
          <div className="outputrc">
            <h6>OUTPUT</h6>
            <textarea className="inputs-output"></textarea>
          </div>
        </div>
        {"\n"}
        {"\n"}
  
        <div className="get-output">
          <button>GET OUTPUT</button>
        </div> 
      </div> */}
      
    </div>
  );
};

const SubmissionsSection = (props) => {
  // Your submissions section JSX
  return (
    <Submission questionId = {props.questionId}/>
  );
};

export default QuestionHubPage;

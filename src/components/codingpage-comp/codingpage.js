import {React,useState,useEffect} from 'react' 
import { AxiosInstance ,addAuthToken} from '../../Utils/AxiosConfig';
import { useParams,useNavigate,Link } from 'react-router-dom';
import "./codingpage.css";
import { getToken} from '../../Utils/utils';
import CodeEditorWindow from './code_editor';
import QuestionHubPage from "./togglebtn";
import { languageOptions } from "./constants/languageOptions";
import ThemeDropdown from "./ThemesDropdown";
import LanguagesDropdown from "./LanguagesDropdown"; 
import { defineTheme } from "../../lib/defineTheme";
import Consolecontent from './consolecontent';
import parse from 'html-react-parser'
import "./tinymce.css"
import HtmlReactParser from 'html-react-parser'
import {  toast } from 'react-toastify';

const subendPoint = "/api/submit/";



export default function Codingpage() {
  const nav = useNavigate();
  
  const [ConsoleMenuOpen, setConsoleMenuOpen] = useState(false); 
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [Emoji, setEmoji] = useState(false);
  const [QuesData,setQuesData] = useState([]);
  const [ExecutedData,setExecutedData] = useState([]);
  const [ExecutedChangedData, setExecutedChangedData] = useState(null);
  const [Questiontoggle,setQuestiontoggle] = useState({});
  const [CodeSnippet,setCodeSnippet] = useState("");
  
  const [isSubmit, setisSubmit] = useState(false);
  const [sampleInput, setsampleInput] = useState("");
  const [code, setCode] = useState('');
  const [theme, setTheme] = useState("cobalt");
  const [language, setLanguage] = useState(languageOptions[0]);
  const [textFieldValue, setTextFieldValue] = useState('');   //to take input from user
  const [highlightedButton, setHighlightedButton] = useState(null);
  const CodeSyntax = {
    "cpp":"#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n// your code goes here\nreturn 0;\n}",
    "c":"",
    "python":"#Start Your Program Here..."
  }
  

  const handleButtonClick = (buttonkey) => {  
    if (highlightedButton === buttonkey) {
      setHighlightedButton(null);
    } else {
      setHighlightedButton(buttonkey);
    }
  };
  const { questionId } = useParams();
  console.log("Debugging : ",questionId)
  const endPoint = `/api/questions/${questionId}/`;

  const toggleModal = () => {
   
     setConsoleMenuOpen(!ConsoleMenuOpen);
     setEmoji(!Emoji);
  }
  const handleDataChange = () => {
    setExecutedData(ExecutedData);
  };
 

  const handleTextFieldChange = (newValue) => {
    setTextFieldValue(newValue);
  };


  useEffect(()=>{
    const jsonObject = JSON.parse(localStorage.getItem('qdata'));
    setQuestiontoggle(jsonObject)
    // console.log("hello",jsonObject);
  //   const keysArray = Object.keys(jsonObject);
  //  setQuestiontoggle(keysArray);
    // keysArray.forEach(key => {
    //   console.log(key);
    // });
    addAuthToken(getToken());
    AxiosInstance.get(endPoint)
            .then((response) => {
                console.log("enter in then ");
                if (response.status) {
                    console.log("enter in then if ");
                    var data = response.data;
                   
                    console.log(data);
                   
                    
                    
                    setQuesData(data);
                    setsampleInput(data.sampleIp)
                    setTextFieldValue(data.sampleIp)
                    console.log("dfsd",data.sampleIp)
                    setLanguage("cpp");

                    console.log("data ",typeof(QuesData));
                    console.log(QuesData);
                    //  console.log(response.data.juniorLeaderboard);

                    

                }
                else {
                    
                    console.log("Error In fetch");
                }
            })
            .catch((error) => {
              nav("/question");
              console.log("enter in error ",error);
              console.clear();
                console.log("enter in error ",error);

            })
  },[endPoint]);

  
  const handleSubmit = async (val) => {
    setExecutedData([]);
    const id = toast.loading("Compilation started");
    setisSubmit(val);
    setConsoleMenuOpen(!ConsoleMenuOpen);
    {ConsoleMenuOpen ?  setConsoleMenuOpen(ConsoleMenuOpen) : setConsoleMenuOpen(!ConsoleMenuOpen)}
    setIsButtonEnabled(true);

    const submissionpayload = {
  
      'question':`${questionId}`,
      'code':`${code}`,
      'language': `${language}`,
      'input': `${textFieldValue}`,
      'isSubmitted': `${val}`
    }
    console.log(QuesData.sampleIp)

    if(submissionpayload['input'] ===  '')
    {
        submissionpayload['input']=QuesData.sampleIp;
    }

    console.log("submission payload ",submissionpayload)
    
    // e.preventDefault();
    addAuthToken(getToken());
    AxiosInstance.post(subendPoint,submissionpayload)
            .then((response) => {
                console.log("enter in then ");
                if (response.status) {
                    console.log("enter in then if ");
                   var  data = response.data;
                    console.log("submission output ",data);
                    setExecutedData(data);
                    // console.log(typeof(data));
                    // console.log(typeof(jdata));
                    // console.log(Object.values(jdata));
                    // console.log(typeof(Object.values(jdata)));
                    setIsButtonEnabled(false);
                    // setModalValue(data.return);
                    
                    toast.update(id, { render: "Compilation Done", type: "success", isLoading: false, autoClose:3000 })
                  }
                  else {
                    setIsButtonEnabled(false);
                    console.log("Error In fetch");
                  }
                })
                .catch((error) => {
                  toast.update(id, { render: "Compilation Failed", type: "error", isLoading: false, autoClose:3000 })
                  setIsButtonEnabled(false);
              console.clear();
                console.log("enter in error ",error);

            })
  
  };



  



  // const handleCodeChange = (newCode) => {
  //   setCode(newCode);
  // };

  function handleThemeChange(th) {
    const theme = th;
    console.log("theme...", theme);

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_) => setTheme(theme));
    }
  }
  useEffect(() => {
    defineTheme("tomorrow-night-blue").then((_) =>
      setTheme({ value: "tomorrow-night-blue", label: "Tomorrow-Night-Blue" })
    );
  },[]);

  const onSelectChange = (sl) => {
    console.log("selected Option...", sl);
    setLanguage(sl.name);
  
  };

  const onChangenew = (action,data) => {
    switch (action) {
      case "code": {

        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action,data);
      }
    }
  };



  
  return (
    <>
   <div className='mainBody container-fluid'>

     
  
    <section className="coding ">
    
    {/* <!-- the Question section starts here  --> */}
    <div className="questionpart">
      <div className='togglepanti'> 
  {
    Object.entries(Questiontoggle)
  //  .map(([key, value]) =>HtmlReactParser( `<p>${key}: ${value}</p>`))
   .map(([key, value]) =>(
     <Link  key={key} to={`/question/${value}`}>
    <button
      type="button"
      className={`questogglebtn ${highlightedButton === key ? 'highlighted' : ''}`}
      onClick={() => handleButtonClick(key)}
    >
        {key} 
       
    </button>
      </Link>
   )
  //  HtmlReactParser( `<p>${key}: ${value}</p>`)
   )
   
}
</div>

      <QuestionHubPage QuesData={QuesData} question_id={questionId} />

    </div>
    
    {/* <!-- The code Editor Section Starts here ... --> */}
    <div className='badadivcode'>
    {/* <div className="h-4 w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"></div> */}
      <div className="selector">
        <div className="px-4 py-2">
          <LanguagesDropdown onSelectChange={onSelectChange} />
        </div>
        <div className="px-4 py-2">
          <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
        </div>
      </div>
    <div className="codingpart">
    
      <div className="code-section" >
      
      <div className="flex flex-col w-full h-full  justify-start items-end">
          <CodeEditorWindow
            code={code}
            onChange={onChangenew}
            language={language}
            theme={theme.value}
            questionId ={questionId}
            CodeSnippet = {CodeSnippet}
          />
        </div>


        {/* <!-- console section --> */}
    

      </div>

      {/* <!-- The Submit Button Code Starts here  --> */}
 
     
    </div>

    <div className="submit-strip">
    {ConsoleMenuOpen && (
                            // <div
                                
                            //     className=""
                            // >
                                <Consolecontent onClick={toggleModal} data={ExecutedData} isSubmit={isSubmit} codeInput={sampleInput} onDataChange={handleDataChange} changedData={ExecutedData}  onTextFieldChange={handleTextFieldChange}/>
                            //</div>
                        )}
        <button type="button" className="console-btn  btn-outline-dark" data-toggle="collapse" id="console-btn"
          data-target="#test-cases"         
          onClick={toggleModal}>
          Console {ConsoleMenuOpen ?  '🔽' : '🔼'}
          <ion-icon name="chevron-up-outline" className="up mx-2 "></ion-icon>
          <ion-icon name="chevron-down-outline" className="down hidden"></ion-icon>
        </button>
       
      
      <div className="submit-btn">
        <button type="button" className="run-btn   btn-outline-dark"  onClick={() => handleSubmit(false)} disabled={isButtonEnabled }  style={{ cursor: isButtonEnabled ? 'not-allowed' : 'default' }}>Run</button>
      </div>
      <div className="sub-btn">
        <button type="button" className="run-btn  btn-outline-dark" id="submit-btn"  onClick={() => handleSubmit(true)} disabled={isButtonEnabled} style={{ cursor: isButtonEnabled ? 'not-allowed' : 'default' }}>Submit</button>
      </div>
    </div> 

    </div>
   


    </section>
    </div>
    </>
    
  )
}

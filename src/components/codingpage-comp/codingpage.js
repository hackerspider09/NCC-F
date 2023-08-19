import {React,useState,useEffect} from 'react'
import { AxiosInstance ,addAuthToken} from '../../Utils/AxiosConfig';
import { useParams } from 'react-router-dom';
import "./codingpage.css";
import { getToken} from '../../Utils/utils';
import CodeEditorWindow from './code_editor';
import QuestionHubPage from "./togglebtn";
import { languageOptions } from "./constants/languageOptions";
import ThemeDropdown from "./ThemesDropdown";
import LanguagesDropdown from "./LanguagesDropdown"; 
import { defineTheme } from "../../lib/defineTheme";
import Consolecontent from './consolecontent';
const subendPoint = "/api/submit/";




export default function Codingpage() {
  
  const [ConsoleMenuOpen, setConsoleMenuOpen] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [Emoji, setEmoji] = useState(false);
  const [QuesData,setQuesData] = useState([]);
  const [ExecutedData,setExecutedData] = useState([]);
  const [ExecutedChangedData, setExecutedChangedData] = useState(null);
  
  
  const [isSubmit, setisSubmit] = useState(false);
  const [sampleInput, setsampleInput] = useState("");
  const [code, setCode] = useState('');
  const [theme, setTheme] = useState("cobalt");
  const [language, setLanguage] = useState(languageOptions[0]);
  const [textFieldValue, setTextFieldValue] = useState('');   //to take input from user
  
  const { questionId } = useParams();
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
                
                console.log("enter in error ",error);

            })
  },[]);

  
  const handleSubmit = async (val) => {
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
    
    // e.preventDefault();
    addAuthToken(getToken());
    AxiosInstance.post(subendPoint,submissionpayload)
            .then((response) => {
                console.log("enter in then ");
                if (response.status) {
                    console.log("enter in then if ");
                   var  data = response.data;
                    console.log(data.input);
                    setExecutedData(data);
                    // console.log(typeof(data));
                    // console.log(typeof(jdata));
                    // console.log(Object.values(jdata));
                    // console.log(typeof(Object.values(jdata)));
                    setIsButtonEnabled(false);
                    // setModalValue(data.return);
                    

                }
                else {
                  setIsButtonEnabled(false);
                    console.log("Error In fetch");
                }
            })
            .catch((error) => {
              setIsButtonEnabled(false);
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
    defineTheme("oceanic-next").then((_) =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );
  }, []);

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
    <div className='mainBody'>

  
    <section className="coding ">

    {/* <!-- the Question section starts here  --> */}
    <div className="questionpart">

      <QuestionHubPage QuesData={QuesData} question_id={questionId}/>

    </div>
    
    {/* <!-- The code Editor Section Starts here ... --> */}
    <div className='badadivcode'>
    <div className="h-4 w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"></div>
      <div className="selector">
        <div className="px-4 py-2">
          <LanguagesDropdown onSelectChange={onSelectChange} />
        </div>
        <div className="px-4 py-2">
          <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
        </div>
      </div>
    <div className="codingpart">
    
      <div className="code-section">
      
      <div className="flex flex-col w-full h-full justify-start items-end">
          <CodeEditorWindow
            code={code}
            onChange={onChangenew}
            language={language?.value}
            theme={theme.value}
          />
        </div>


        {/* <!-- console section --> */}
    

      </div>

      {/* <!-- The Submit Button Code Starts here  --> */}
 
     
    </div>

    <div className="submit-strip">
        
        <button type="button" className="console-btn  btn-outline-dark" data-toggle="collapse" id="console-btn"
          data-target="#test-cases"         
          onClick={toggleModal}>
          Console {ConsoleMenuOpen ?  '🔽' : '🔼'}
          <ion-icon name="chevron-up-outline" className="up mx-2 "></ion-icon>
          <ion-icon name="chevron-down-outline" className="down hidden"></ion-icon>
        </button>
        {ConsoleMenuOpen && (
                            // <div
                                
                            //     className=""
                            // >
                                <Consolecontent onClick={toggleModal} data={ExecutedData} isSubmit={isSubmit} codeInput={sampleInput} onDataChange={handleDataChange} changedData={ExecutedData}  onTextFieldChange={handleTextFieldChange}/>
                            //</div>
                        )}
      
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

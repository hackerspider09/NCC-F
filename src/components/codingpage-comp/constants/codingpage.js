import {React,useState,useEffect} from 'react'
import { AxiosInstance ,addAuthToken} from '../../Utils/AxiosConfig';
import { useParams } from 'react-router-dom';
import "./codingpage.css";
import { getToken} from '../../Utils/utils';
import CodeEditorWindow from './code_editor';
import { languageOptions } from "./constants/languageOptions";
import ThemeDropdown from "./ThemesDropdown";
import LanguagesDropdown from "./LanguagesDropdown"; 
import { defineTheme } from "../../lib/defineTheme";
import Consolecontent from './consolecontent';
const subendPoint = "/api/submit/";
export default function Codingpage() {
  
  // const [ConsoleMenuOpen, setConsoleMenuOpen] = useState(false);
  const { questionId } = useParams();
  const endPoint = `/api/questions/${questionId}/`;
const [modalClass,setModalClass] = useState('');
const [isModalActive, setIsModalActive] = useState(false);

const handleButtonClick = (buttonId) => {
  setModalClass(buttonId);
  setIsModalActive(true);
};

const handleModalContainerClick = () => {
  setModalClass('out');
  setIsModalActive(false);
};
  // const toggleModal = () => {
  //    setConsoleMenuOpen(!ConsoleMenuOpen);
  // setIsModalActive(!isModalActive);
  // }


  const [QuesData,setQuesData] = useState([]);
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
    const submissionpayload = {
  
      'question':`${questionId}`,
      'code':"print('hhhh')",
      'language': "python",
      'input': " hh ",
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
                    console.log(data);
                    
                    // console.log(typeof(data));
                    // console.log(typeof(jdata));
                    // console.log(Object.values(jdata));
                    // console.log(typeof(Object.values(jdata)));
                    
                    

                }
                else {
                    
                    console.log("Error In fetch");
                }
            })
            .catch((error) => {
                
                console.log("enter in error ",error);

            })
  
  };



  const [code, setCode] = useState('');
  const [theme, setTheme] = useState("cobalt");
  const [language, setLanguage] = useState(languageOptions[0]);


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
    setLanguage(sl);
  };

  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };

  
  return (
    <>
    <body className='mainBody'>

  
    <section className="coding ">

    {/* <!-- the Question section starts here  --> */}
    <div className="questionpart">
      <div className="question-sec">
      {/* {QuesData.map((item) => (
        <Question key={question.questionId} questionData={question} />
      ))} */}
        <div className="que-name">
          
          <h3> {QuesData.title} </h3>
          
        </div>
        <div className="quepart que-description" Style="height: auto;">
          <h4>Description</h4>
          <p>{QuesData.description} {"\n"}</p>
          
          <h4>Input Format</h4> {"\n"}
           <p>{QuesData.sampleIp}</p>{"\n"} 


       <h4>Output Format</h4>{"\n"}
       <p>{QuesData.sampleOp}</p>
          
         
        
          <h3>Question Constraints</h3>{"\n"}
          <p>{QuesData.constraints}
          </p>{"\n"}

          <h3>Author</h3>{"\n"}
          <p>{QuesData.author}
          </p>{"\n"}

          <h3>Points</h3>{"\n"}
          <p>{QuesData.points}
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
            onChange={onChange}
            language={language?.value}
            theme={theme.valueOf}
          />
        </div>


        {/* <!-- console section --> */}
    

      </div>

      {/* <!-- The Submit Button Code Starts here  --> */}
 
     
    </div>

    <div className="submit-strip">
        
        <button type="button" className="console-btn  btn-outline-dark" data-toggle="collapse" id="console-btn"
          data-target="#test-cases"         
          // onClick={toggleModal}>
          onClick={() => handleButtonClick('console-btn')}>
          Console 🔼
          <ion-icon name="chevron-up-outline" className="up mx-2 "></ion-icon>
          <ion-icon name="chevron-down-outline" className="down hidden"></ion-icon>
        </button>

        <div id="modal-container" onClick={handleModalContainerClick}>
         <div class="modal-background">
          <div class="modal">
          {ConsoleMenuOpen && (
                           
                           <Consolecontent onClick={toggleModal} />
                       
                   )}
          </div>
     

         </div>
        </div>
        
      
      <div className="submit-btn">
        <button type="button" className="run-btn   btn-outline-dark"  onClick={() => handleSubmit(false)}>Run</button>
      </div>
      <div className="sub-btn">
        <button type="button" className="run-btn  btn-outline-dark" id="submit-btn"  onClick={() => handleSubmit(true)}>Submit</button>
      </div>
    </div> 

    </div>
   


    </section>
    </body>
    </>
    
  )
}

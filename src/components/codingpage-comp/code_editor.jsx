
import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
 import   {useParams} from  'react-router-dom'
// const defaultTemplate ={
//   welcomeMessage :"welcome",
  
// };

// const pythonTemplate ={
//   welcomeMessage :"welcome2",
  
// };

const CodeEditorWindow = ({ onChange, language, code, theme ,questionId }) => {
  // const { questionId } = useParams();
  const [value, setValue] = useState(code || "");
  const [CodeSnippet,setCodeSnippet] = useState("");
  const CodeSyntax = {
    "cpp":"#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n// your code goes here\nreturn 0;\n}",
    "c":'#include <stdio.h>\nint main() {\n\nprintf("Hello, World!");\nreturn 0;\n}',
    "python":"#Start Your Program Here...",
    "java":"import java.util.Scanner;\npublic class solution {\npublic static void main(String[] args) {\n// Write Your Code Here \n}\n}"
  }
 
  // const [currentTemplate, setCurrentTemplate] = useState(defaultTemplate );
  // const handleLanguageChange = (language)=>{
  //   if (language==='cpp'){
  //     setCurrentTemplate(defaultTemplate);
  //   }
  //   else(language==='python'){
  //     setCurrentTemplate(pythonTemplate);

  //   }
  console.log("On editor : ", questionId)
  useEffect(() => {
    // Load content from local storage
    console.log(questionId);
    const storedCode = localStorage.getItem(questionId+language);  
    if (storedCode) {
      setValue(storedCode);  
    }else{
      
      setValue(CodeSyntax[language]);  
    }

  }, [language]); // Run this effect only once on component mount

  const handleEditorChange = (value) => {
    setValue(value);    
    onChange("code", value);   

    // Save code  to local storage
    localStorage.setItem(questionId+language, value,)
  };

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="85vh"
        width="100%"
        language={language || "cpp"}
        value={value}
        theme={theme?theme:"tomorrow-night-blue"}
        defaultValue={CodeSyntax["cpp"]}
        onChange={handleEditorChange}  
      />
    </div>
  );
};

export default CodeEditorWindow;   

// import React, { useState } from "react";
// import Editor from "@monaco-editor/react";

// const CodeEditorWindow = ({ onChange, language, code, theme }) => {
//   const [value, setValue] = useState(code || "");

//   const handleEditorChange = (value) => {
//     setValue(value);
//     onChange("code", value);
//   };


//   return (
//     <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
//       <Editor
//         height="85vh"
//         width="100%"
//         language={language || "cpp"}
//         value={value}
//         theme={theme}
    
//         defaultValue="#include <iostream>
//         using namespace std;
        
//         int main() {
//           // your code goes here
//           return 0;
//         }
//         "
//         onChange={handleEditorChange}
       
//       />
//     </div>
//   );
// };

// export default CodeEditorWindow;


// import React, { useState } from "react";

// import Editor from "@monaco-editor/react";
// import {syntaxOptions} from "./constants/syntax"

// const CodeEditorWindow = ({ onChange, language, code, theme }) => {
//   const [value, setValue] = useState(code || "");

//   const handleEditorChange = (value) => {
//     setValue(value);
//     onChange("code", value);
//   };

//   return (
//     <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
//       <Editor
//         height="85vh"
//         width={`100%`}
//         language={language || "cpp"}
//         value={value}
//         theme={theme}
//         defaultValue="// some comment"
//         onChange={handleEditorChange}
//       />
//     </div>
//   );
// };
// export default CodeEditorWindow;

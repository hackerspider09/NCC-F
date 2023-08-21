
import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
// const defaultTemplate ={
//   welcomeMessage :"welcome",
  
// };

// const pythonTemplate ={
//   welcomeMessage :"welcome2",
  
// };

const CodeEditorWindow = ({ onChange, language, code, theme }) => {
  const [value, setValue] = useState(code || "");
 
  // const [currentTemplate, setCurrentTemplate] = useState(defaultTemplate );
  // const handleLanguageChange = (language)=>{
  //   if (language==='cpp'){
  //     setCurrentTemplate(defaultTemplate);
  //   }
  //   else(language==='python'){
  //     setCurrentTemplate(pythonTemplate);

  //   }

  useEffect(() => {
    // Load content from local storage
    const storedCode = localStorage.getItem("editorContent");  
    if (storedCode) {
      setValue(storedCode);  
    }
  }, []); // Run this effect only once on component mount

  const handleEditorChange = (value) => {
    setValue(value);    
    onChange("code", value);   

    // Save content to local storage
    localStorage.setItem("editorContent", value,)
  };

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="85vh"
        width="100%"
        language={language || "cpp"}
        value={value}
        theme={theme}
        defaultValue="#include <iostream>
using namespace std;

int main() {
  // your code goes here
  return 0;
}"
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

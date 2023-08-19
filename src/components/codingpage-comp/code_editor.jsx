import React, { useState } from "react";
import Editor from "@monaco-editor/react";

const CodeEditorWindow = ({ onChange, language, code, theme }) => {
  const [value, setValue] = useState(code || "");

  const handleEditorChange = (value) => {
    setValue(value);
    onChange("code", value);
  };

  const handleEditorDidMount = (editor, monaco) => {
    // Register IntelliSense providers based on the language
    switch (language) {
      case "cpp":
        monaco.languages.registerCompletionItemProvider("cpp", {
          provideCompletionItems: (model, position) => {
            const suggestions = [
              {
                label: "cout",
                kind: monaco.languages.CompletionItemKind.Method,
                insertText: "cout << ${1};",
              },
              // Add more C++ suggestions
            ];
            return { suggestions: suggestions };
          },
        });
        break;
      case "java":
        monaco.languages.registerCompletionItemProvider("java", {
          provideCompletionItems: (model, position) => {
            const suggestions = [
              {
                label: "System.out.println",
                kind: monaco.languages.CompletionItemKind.Method,
                insertText: "System.out.println(${1});",
              },
              // Add more Java suggestions
            ];
            return { suggestions: suggestions };
          },
        });
        break;
      case "python":
        monaco.languages.registerCompletionItemProvider("python", {
          provideCompletionItems: (model, position) => {
            const suggestions = [
              {
                label: "print",
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: "print(${1})",
              },
              // Add more Python suggestions
            ];
            return { suggestions: suggestions };
          },
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="85vh"
        width="100%"
        language={language || "cpp"}
        value={value}
        theme={theme}
        defaultValue="// some comment"
        onChange={handleEditorChange}
        onMount={handleEditorDidMount} // Use onMount to register IntelliSense
      />
    </div>
  );
};

export default CodeEditorWindow;


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

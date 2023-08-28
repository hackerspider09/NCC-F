import { loader } from "@monaco-editor/react";

const monacoThemes = {
  "tomorrow-night-blue" : "Tomorrow-Night-Blue",
  "active4d": "Active4D",
  "all-hallows-eve" : "All Hallows Eve",
  "brilliance-black": "Brilliance Black",
  "amy": "Amy"
};

const defineTheme = (theme) => {
  return new Promise((res) => {
    Promise.all([
      loader.init(),
      import(`monaco-themes/themes/${monacoThemes[theme]}.json`),
    ]).then(([monaco, themeData]) => {
      monaco.editor.defineTheme(theme, themeData);  
      res(); 
    });
  });
};

export { defineTheme };
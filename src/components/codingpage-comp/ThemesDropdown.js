import React from "react";
import Select from "react-select";
import monacoThemes from "monaco-themes/themes/themelist";
import { customStyles } from "./constants/customstyles";

const ThemeDropdown = ({ handleThemeChange, theme }) => {
  const def = Object.entries(monacoThemes).filter((entries,index)=> index === 39);
  var entry = Object.entries(monacoThemes).filter((entries, index) => index < 3);
  var entry2 = def.concat(entry);
  return (
    <Select
      placeholder={`Select Theme`}  
      //  options={languageOptions}
      options={entry2.map(([themeId, themeName]) => ({
        label: themeName,
        value: themeId,
        key: themeId,
      }))}
      value={theme}  
      styles={customStyles} 
      onChange={handleThemeChange}  
    />
  );
};

export default ThemeDropdown;
import React, { useState } from "react";

export const ThemeContext = React.createContext<ThemeContextType | null>(null);

// export const ThemeContext = React.createContext({
//   mode: "a",
//   changeTheme: () => {},
// });
//////////////////////////////////////////////////////////////
const ThemeContexProvider = (props: {
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}) => {
  // Initial state and function declarations will be here:
  const [mode, setMode] = useState("light");
  const changeThemeHandler = () => {
    document.documentElement.setAttribute("data-theme", "dark");
    setMode((prevTheme) => {
      if (prevTheme === null) {
        prevTheme = "light";
      }
      return prevTheme === "light" ? "dark" : "light";
    });
  };
  return (
    <ThemeContext.Provider
      value={{
        mode,
        changeTheme: changeThemeHandler,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};
export default ThemeContexProvider;

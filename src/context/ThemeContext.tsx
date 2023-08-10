import React, { PropsWithChildren, useState } from "react";
import { ThemeContextType } from "../types/Types";

export const ThemeContext = React.createContext<ThemeContextType | null>(null);

export enum BrightnessModes {
  light = "light",
  dark = "dark",
}

const ThemeContexProvider = (props: PropsWithChildren) => {
  const [mode, setMode] = useState(BrightnessModes.light);
  const changeThemeHandler = () => {
    document.documentElement.setAttribute("data-theme", "dark");
    setMode((prevTheme) => {
      if (prevTheme === null) {
        prevTheme = BrightnessModes.light;
      }
      return prevTheme === BrightnessModes.light
        ? BrightnessModes.dark
        : BrightnessModes.light;
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

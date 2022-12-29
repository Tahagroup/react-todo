import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function Header() {
  const themeContext = useContext(ThemeContext);
  const mode = themeContext!.mode;
  const changeTheme = themeContext!.changeTheme;

  function toggleThemeHandler() {
    changeTheme();
  }

  return (
    <div className="headerWrapper">
      <div className="appName">TODO</div>
      <img
        src={mode === "light" ? "./icon-moon.svg" : ".//icon-sun.svg"}
        alt="toggle"
        onClick={toggleThemeHandler}
        className="toggleSwitch"
      />
    </div>
  );
}

export default Header;

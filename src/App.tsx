import { useContext } from "react";
import Header from "./components/Header";
import TodoInput from "./components/TodoInput";
import Todos from "./components/Todos";
import { BrightnessModes, ThemeContext } from "./context/ThemeContext";
import "./scss/styles.ts";

function App() {
  const themeContext = useContext(ThemeContext);

  const isDesktop = document.body.clientWidth > 1000;
  const bgClass = `${
    themeContext?.mode === BrightnessModes.light
      ? isDesktop
        ? "background__Desktop-light"
        : "background__Mobile-light"
      : isDesktop
      ? "background__Desktop-dark"
      : "background__Mobile-dark"
  }`;
  const colorbgClass =
    themeContext?.mode === BrightnessModes.light
      ? "color__background color__background-light"
      : " color__background color__background-dark ";
  // return //
  return (
    <div className={colorbgClass}>
      <div className={`background ${bgClass}`}>
        <div className="App">
          <Header />
          <TodoInput />
          <Todos />
        </div>
      </div>
    </div>
  );
}

export default App;

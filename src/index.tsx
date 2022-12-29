import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import TodoContexProvider from "./context/TodoContext";
import ThemeContexProvider from "./context/ThemeContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <TodoContexProvider>
      <ThemeContexProvider>
        <App />
      </ThemeContexProvider>
    </TodoContexProvider>
  </React.StrictMode>
);

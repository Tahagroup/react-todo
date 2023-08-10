import React, { useContext, useRef } from "react";
import { BrightnessModes, ThemeContext } from "../context/ThemeContext";
import { TodoContext } from "../context/TodoContext";
import { TodoContextType } from "../types/Types";

function TodoInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { addTodoHandler } = React.useContext(TodoContext) as TodoContextType;

  const themeContext = useContext(ThemeContext);

  function formSubmitHandler(event: React.SyntheticEvent) {
    event.preventDefault();
    const enteredValue = inputRef.current!.value;
    if (enteredValue.trim() === "") {
      return;
    }
    addTodoHandler(inputRef.current!.value);
    inputRef.current!.value = "";
  }

  return (
    <form onSubmit={formSubmitHandler} className="todoForm">
      <div className="empty-circle"></div>
      <input
        type="text"
        className={`todoInput ${
          themeContext?.mode === BrightnessModes.dark && BrightnessModes.dark
        }`}
        ref={inputRef}
        placeholder="Create a new todo"
      />
    </form>
  );
}

export default TodoInput;

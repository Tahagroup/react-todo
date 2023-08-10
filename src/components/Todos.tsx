import React, { useContext, useState, MouseEvent } from "react";
import { BrightnessModes, ThemeContext } from "../context/ThemeContext";
import { TodoContext } from "../context/TodoContext";
import Todo from "./Todo";
import { TodoType } from "../types/Types";

enum TodoStates {
  All = "All",
  Active = "Active",
  Completed = "Completed",
}

function Todos() {
  const [activeFilter, setActiveFilter] = useState(TodoStates.All);
  const todoContext = useContext(TodoContext);
  const themeContext = useContext(ThemeContext);
  const TodoData = todoContext!.todos;
  const remaining = TodoData.length - +todoContext!.getTodoSummary();

  function filterChangeHandler(event: MouseEvent<HTMLDivElement>) {
    const selectedFilter = (event.target! as HTMLDivElement).textContent!;
    setActiveFilter(selectedFilter as unknown as TodoStates);
  }

  let filteredTodos: TodoType[] = [];
  switch (activeFilter) {
    case TodoStates.All:
      filteredTodos = TodoData;
      activeClassChanger(TodoStates.All);
      break;
    case TodoStates.Active:
      filteredTodos = TodoData.filter((todo: TodoType) => todo.done === false);
      activeClassChanger(TodoStates.Active);
      break;

    case TodoStates.Completed:
      filteredTodos = TodoData.filter((todo: TodoType) => todo.done === true);
      activeClassChanger(TodoStates.Completed);
      break;

    default:
      filteredTodos = TodoData;
      activeClassChanger(TodoStates.All);
      break;
  }
  function activeClassChanger(filter: TodoStates) {
    document.querySelectorAll(".filter")!.forEach((element) => {
      element.classList.remove("filterActive");
    });
    // add class for both mobile & desktop filters
    document.querySelectorAll(`.${filter}`)[0]?.classList.add("filterActive");
    document.querySelectorAll(`.${filter}`)[1]?.classList.add("filterActive");
  }

  const todosToRender = filteredTodos.map((todo) => (
    <Todo todoData={todo} key={todo.id} />
  ));

  return (
    <div
      className={`cardWrapper ${
        themeContext?.mode === BrightnessModes.dark && BrightnessModes.dark
      }`}
    >
      <div className="itemsWrapper">
        {todosToRender}
        <div className="done-summary">
          <div>{remaining + " items left"} </div>
          <div className="filterTodos desktop-only">
            <div
              className="filter All filterActive"
              onClick={filterChangeHandler}
            >
              All
            </div>
            <div className="filter Active" onClick={filterChangeHandler}>
              Active
            </div>
            <div className="filter Completed" onClick={filterChangeHandler}>
              Completed
            </div>
          </div>
          <div
            style={{ cursor: "pointer" }}
            onClick={todoContext?.clearAllCompleted}
          >
            Clear Completed
          </div>
        </div>
      </div>
      {/* Filters:(Mobile) */}
      <div className="filterTodos mobile-only mobile-card">
        <div className="filter All filterActive" onClick={filterChangeHandler}>
          All
        </div>
        <div className="filter Active" onClick={filterChangeHandler}>
          Active
        </div>
        <div className="filter Completed" onClick={filterChangeHandler}>
          Completed
        </div>
      </div>
      <div className="drag-helper">drag and drop to reorder list</div>
    </div>
  );
}

export default Todos;

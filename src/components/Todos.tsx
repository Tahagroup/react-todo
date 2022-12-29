import React, { useContext, useState, MouseEvent } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { TodoContext } from "../context/TodoContext";
import Todo from "./Todo";

function Todos() {
  const [activeFilter, setActiveFilter] = useState("All");
  const todoContext = useContext(TodoContext);
  const themeContext = useContext(ThemeContext);
  const TodoData = todoContext!.todos;
  const remaining = TodoData.length - +todoContext!.getTodoSummary();

  function filterChangeHandler(event: MouseEvent<HTMLDivElement>) {
    const selectedFilter = (event.target! as HTMLDivElement).textContent!;
    setActiveFilter(selectedFilter);
  }

  let filteredTodos: TodoType[] | undefined = [];
  switch (activeFilter) {
    case "All":
      filteredTodos = TodoData;
      activeClassChanger("All");
      break;
    case "Active":
      filteredTodos = TodoData.filter((todo) => todo.done === false);
      activeClassChanger("Active");
      break;

    case "Completed":
      filteredTodos = TodoData.filter((todo) => todo.done === true);
      activeClassChanger("Completed");
      break;
  }
  function activeClassChanger(filter: string) {
    document.querySelectorAll(".filter")!.forEach((element) => {
      element.classList.remove("filterActive");
    });
    // add class for both mobile & desltop filters
    document.querySelectorAll(`.${filter}`)[0]?.classList.add("filterActive");
    document.querySelectorAll(`.${filter}`)[1]?.classList.add("filterActive");
  }

  const todosToRender = filteredTodos.map((todo) => (
    <Todo todoData={todo} key={todo.id} />
  ));

  return (
    <div className={`cardWrapper ${themeContext?.mode === "dark" && "dark"}`}>
      <div className="itemsWrapper">
        {/* Todos */}
        {todosToRender}
        {/* summary: */}
        <div className="done-summary">
          <div>{remaining + " items left"} </div>
          {/*  */}
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
          {/*  */}
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
    </div>
  );
}

export default Todos;

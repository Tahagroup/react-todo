import React, { useContext } from "react";
import { BrightnessModes, ThemeContext } from "../context/ThemeContext";
import { TodoContext } from "../context/TodoContext";
import { TodoType } from "../types/Types";

// function findClosestElement(
//   draggableElements: any[],
//   YpositionOfMouse: number
// ): HTMLElement {
//   const closestElement = draggableElements.reduce(
//     function (closest, child) {
//       const box = child.getBoundingClientRect();
//       // offset from elements center: negative means upper than element
//       const offset: number = YpositionOfMouse - box.top - box.height / 2;
//       if (offset < 0 && offset > closest.offset) {
//         return { offset: offset, element: child };
//       } else {
//         return closest;
//       }
//     },
//     { offset: Number.MIN_SAFE_INTEGER }
//   );
//   return closestElement.element;
// }

interface TodoTypes {
  todoData: TodoType;
}
function Todo({ todoData }: TodoTypes) {
  const themeContext = useContext(ThemeContext);
  const removeTodoHandler = useContext(TodoContext)!.removeTodoHandler;
  const ToggleTodoHandler = useContext(TodoContext)!.ToggleTodoHandler;
  const changeTodosPosition = useContext(TodoContext)!.changeTodosPosition;
  let nextElementId: string;

  function dragStartHandler(event: React.DragEvent) {
    (event.target as HTMLElement).classList.add("dragging");
  }
  function touchStartHandler(event: React.TouchEvent) {
    (event.target as HTMLElement).classList.add("dragging");
  }

  // dragEnd
  function dragEndHandler(event: React.DragEvent) {
    const draggableElements = Array.from(
      document.querySelectorAll(".draggable:not(.dragging)")
    );
    draggableElements.forEach((element) => element.classList.remove("drag-target"));
    const closestElement = draggableElements.reduce(
      function (closest, child) {
        const box = child.getBoundingClientRect();
        // offset from elements center: negative means upper than element
        //  const offset: number = event.clientY - box.top - box.height / 2;
        const offset: number = event.clientY - box.top - box.height;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.MIN_SAFE_INTEGER, element: draggableElements.pop() }
    );

    nextElementId = closestElement.element?.getAttribute("data-id")!;
    // replace current element with selected one:
    changeTodosPosition(
      (event.target as HTMLElement)!.getAttribute("data-id")!,
      nextElementId
    );
    (event.target as HTMLElement).classList.remove("dragging");
  }

  function touchEndHandler(event: React.TouchEvent) {
    const draggableElements = Array.from(
      document.querySelectorAll(".draggable:not(.dragging)")
    );
    const closestElement = draggableElements.reduce(
      function (closest, child) {
        const box = child.getBoundingClientRect();
        const offset: number =
          event.changedTouches[0].clientY - box.top - box.height;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.MIN_SAFE_INTEGER, element: draggableElements.pop() }
    );

    nextElementId = closestElement.element?.getAttribute("data-id")!;
    // replace current element with selected one:
    changeTodosPosition(
      //#TODO: get parent instead of inside element
      (event.currentTarget as HTMLElement)!.getAttribute("data-id")!,
      nextElementId
    );
    (event.target as HTMLElement).classList.remove("dragging");
  }

  function dragOverHandler(event: React.DragEvent) {
    event.currentTarget.classList.add("drag-target");
    event.preventDefault();
  }
  function dragLeaveHandler(event: React.DragEvent) {
    event.currentTarget.classList.remove("drag-target");
    event.preventDefault();
  }
  return (
    <div
      draggable
      onTouchStart={touchStartHandler}
      onTouchEnd={touchEndHandler}
      onDragStart={dragStartHandler}
      onDragEnd={dragEndHandler}
      onDragOver={dragOverHandler}
      onDragLeave={dragLeaveHandler}
      className={`draggable ${
        themeContext?.mode === BrightnessModes.dark ? BrightnessModes.dark : ""
      }`}
      data-id={todoData.id}
    >
      <div className="todoWrapper">
        {todoData.done ? (
          <img
            src="./icon-check.svg"
            className="checkBox"
            alt=""
            onClick={() => {
              ToggleTodoHandler(todoData.id);
            }}
          />
        ) : (
          <div
            className="undone-circle"
            onClick={() => {
              ToggleTodoHandler(todoData.id);
            }}
          ></div>
        )}
        <span className={todoData.done ? "todotext line-through" : "todotext"}>
          {todoData.text}
        </span>
        <img
          src="./icon-cross.svg"
          className="deleteCross"
          alt=""
          onClick={() => removeTodoHandler(todoData.id)}
        />
      </div>
    </div>
  );
}

export default Todo;

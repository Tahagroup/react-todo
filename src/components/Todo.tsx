import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { TodoContext } from "../context/TodoContext";

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

  // dragOver
  // function dragOverHandler(event: React.DragEvent) {
  //   event.preventDefault();
  //   nextElementId = findClosestElement(
  //     Array.from(document.querySelectorAll(".draggable:not(.dragging)")),
  //     event.clientY
  //   )?.getAttribute("data-id")!;

  //   // handle append to last:
  //   if (nextElementId === undefined) {
  //     const lastElementId: string = Array.from(
  //       document.querySelectorAll(".draggable")
  //     )
  //       .pop()!
  //       .getAttribute("data-id")!;
  //     nextElementId = lastElementId;
  //   }
  //   nextElementId = "4";
  // }

  // dragEnd
  function dragEndHandler(event: React.DragEvent) {
    const draggableElements = Array.from(
      document.querySelectorAll(".draggable:not(.dragging)")
    );
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
  ///////////////////////////////////
  function touchEndHandler(event: React.TouchEvent) {
    // console.log(event.target);

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
    event.preventDefault();
  }
  return (
    <div
      draggable
      onTouchStart={touchStartHandler}
      onDragStart={dragStartHandler}
      onDragEnd={dragEndHandler}
      onTouchEnd={touchEndHandler}
      onDragOver={dragOverHandler}
      className={`draggable ${themeContext?.mode === "dark" ? "dark" : ""}`}
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

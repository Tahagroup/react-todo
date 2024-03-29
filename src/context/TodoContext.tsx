import React, { PropsWithChildren, useState } from "react";
import { TodoContextType, TodoType } from "../types/Types";
export const TodoContext = React.createContext<TodoContextType | null>(null);

const TodoContexProvider = (props: PropsWithChildren) => {
  const [todos, setTodos] = useState<TodoType[]>([
    { id: "1", text: "complete JS course", done: true },
    { id: "2", text: "Jog around the park", done: false },
    { id: "3", text: "Read for one hour", done: false },
    { id: "4", text: "Pick up groceries", done: true },
  ]);
  const addTodoHandler = (text: string) => {
    setTodos([...todos, { text, done: false, id: uniqueId() }]);
  };
  const removeTodoHandler = (removingId: string) => {
    const newTodos = todos.filter((todo) => {
      return todo.id !== removingId;
    });
    setTodos(newTodos);
  };
  const ToggleTodoHandler = (toggleId: string) => {
    const editedtodos = [...todos];
    const prevTodoindex = editedtodos.findIndex((todo) => todo.id === toggleId);
    editedtodos[prevTodoindex].done = !editedtodos[prevTodoindex].done;
    setTodos(editedtodos);
  };

  const getTodoSummary = () => {
    const countOfCompleted = todos.reduce((acc, todo) => {
      return acc + Number(todo.done === true);
    }, 0);
    return countOfCompleted;
  };
  const clearAllCompleted = () => {
    const newTodos = todos.filter((todo) => {
      return todo.done === false;
    });
    setTodos(newTodos);
  };
  const changeTodosPosition = (srcId: string, dstId: string) => {
    const srcIndex = todos.findIndex((todo) => todo.id === srcId);
    const dstIndex = todos.findIndex((todo) => todo.id === dstId);
    const newTodos = [...todos];
    const temp = newTodos[srcIndex];
    newTodos[srcIndex] = newTodos[dstIndex];
    newTodos[dstIndex] = temp;
    setTodos(newTodos);
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodoHandler,
        removeTodoHandler,
        ToggleTodoHandler,
        getTodoSummary,
        clearAllCompleted,
        changeTodosPosition,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};
export default TodoContexProvider;

const uniqueId = () => Math.random().toString(36).slice(2, 9);

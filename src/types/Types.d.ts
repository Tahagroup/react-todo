import { BrightnessModes } from "../context/ThemeContext";

interface TodoType {
  id: string;
  text: string;
  done: boolean;
}

interface TodoContextType {
  todos: TodoType[];
  addTodoHandler: (text: string) => void;
  removeTodoHandler: (id: string) => void;
  ToggleTodoHandler: (id: string) => void;
  getTodoSummary: () => void;
  clearAllCompleted: () => void;
  changeTodosPosition: (srcId: string, dstId: string) => void;
}

interface ThemeContextType {
  mode: BrightnessModes;
  changeTheme: () => void;
}

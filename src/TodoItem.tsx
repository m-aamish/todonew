import React from "react";
import { Item } from "./interfaces";


interface TodoItemProps {
  todo: Item;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => (
  <li
    key={todo.id}
    style={{
      border: "1px solid black",
      padding: "8px",
      backgroundColor: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    <div
      onClick={() => onToggle(todo.id)}
      style={{
        textDecoration: todo.completed ? "line-through" : "none",
        cursor: "pointer",
      }}
    >
      {todo.todo}
    </div>
    <span onClick={() => onDelete(todo.id)} style={{ cursor: "pointer" }}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
</svg>

    </span>
  </li>
);

export default TodoItem;
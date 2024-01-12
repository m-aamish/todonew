import React, { useState, useEffect, useRef } from "react";
import TodoItem from "./TodoItem";
import { Item } from "./interfaces";

import "./index.css";

// interface Item {
//   id: number;
//   todo: string;
//   completed: boolean;
// }

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Item[]>(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  const [input, setInput] = useState<string>("");

  const handleToggle = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  const handleDelete = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };
  const idCounter = useRef<number>(todos.length + 1);
  const handleClick = () => {
    if (input.trim() !== "") {
      const newTodo: Item = { id: idCounter.current++, todo: input, completed: false };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setInput("");
    }
  };

  const handleReset = () => {
    // Filter out the locally added items and keep only the fetched items
    setTodos((prevTodos) =>
      prevTodos.filter((todo) => todo.id <= idCounter.current)
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    fetch('https://dummyjson.com/todos')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.todos && Array.isArray(data.todos)) {
          setTodos(data.todos.map((todo: Item) => ({
            id: todo.id,
            todo: todo.todo,
            completed: todo.completed
          })));
        //   localStorage.setItem("todos", JSON.stringify(todos));
        } else {
          console.error("Invalid response format. Expected 'todos' array.");
        }
      })
      .catch(error => {
        console.error("Error fetching todos:", error);
      });
  }, []);

  return (
    <div className="main-container">
      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Todo List</h1>
      <input
        type="text"
        placeholder="Add Todo Item"
        value={input}
        onChange={(e) => setInput(e.currentTarget.value)}
        onKeyPress={handleKeyPress}
      />
      <div>
        <button onClick={handleClick}>Add</button>

        <button onClick={handleReset} style={{marginLeft:'10px'}}>Reset</button>
      </div>
      
      <h1 style={{ fontSize: "20px", fontWeight: "bold", paddingTop: "10px" }}>
        Here is the List:
      </h1>
      
      <div className="list-container" style={{maxHeight:'300px', overflowY:'auto'}}>
      <ul>
        {todos.map((todo) => (
          <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
        ))}
      </ul>
      </div>
    </div>
  );
};

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

  
 // console.log(storeditems);
  //const [todos,setTodos]=useState(storeditems);
  /////////////////////const [todos, setTodos] = useState<Item[]>([]);
  //const [todos, setTodos] = useState<Item[]>(() => {
    // const storedTodos = localStorage.getItem("todos");
    // return storedTodos ? JSON.parse(storedTodos) : [];
  //});

  const [input, setInput] = useState<string>("");

  const [lastId, setLastId] = useState(0);
  const [todos, setTodos] = useState<Item[]>([
    {"id":1,"todo":"Do something nice for someone I care about","completed":true},{"id":2,"todo":"Memorize the fifty states and their capitals","completed":false},{"id":3,"todo":"Watch a classic movie","completed":false},{"id":4,"todo":"Contribute code or a monetary donation to an open-source software project","completed":false},{"id":5,"todo":"Solve a Rubik's cube","completed":false},{"id":6,"todo":"Bake pastries for me and neighbor","completed":false},{"id":7,"todo":"Go see a Broadway production","completed":false},{"id":8,"todo":"Write a thank you letter to an influential person in my life","completed":true},{"id":9,"todo":"Invite some friends over for a game night","completed":false},{"id":10,"todo":"Have a football scrimmage with some friends","completed":false},{"id":11,"todo":"Text a friend I haven't talked to in a long time","completed":false},{"id":12,"todo":"Organize pantry","completed":true},{"id":13,"todo":"Buy a new house decoration","completed":false},{"id":14,"todo":"Plan a vacation I've always wanted to take","completed":false},{"id":15,"todo":"Clean out car","completed":false},{"id":16,"todo":"Draw and color a Mandala","completed":true},{"id":17,"todo":"Create a cookbook with favorite recipes","completed":false},{"id":18,"todo":"Bake a pie with some friends","completed":false},{"id":19,"todo":"Create a compost pile","completed":true},{"id":20,"todo":"Take a hike at a local park","completed":true},{"id":21,"todo":"Take a class at local community center that interests you","completed":false},{"id":22,"todo":"Research a topic interested in","completed":false},{"id":23,"todo":"Plan a trip to another country","completed":true},{"id":24,"todo":"Improve touch typing","completed":false},{"id":25,"todo":"Learn Express.js","completed":false},{"id":26,"todo":"Learn calligraphy","completed":false},{"id":27,"todo":"Have a photo session with some friends","completed":false},{"id":28,"todo":"Go to the gym","completed":false},{"id":29,"todo":"Make own LEGO creation","completed":false},{"id":30,"todo":"Take cat on a walk","completed":false}
  ]);
  const [currentTodo, setCurrentTodo] = useState("");
  const [editTodo, setEditTodo] = useState("");

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
  const idCounter = useRef<number>(todos.length);


  const handleClick = () => {
    if (input.trim() !== "") {
      const newTodo: Item = { id: idCounter.current++, todo: input, completed: false };
      setTodos((prevTodos) => [newTodo, ...prevTodos]);
      setInput("");
    }
  };

  const handleReset = () => {
    
    setTodos((prevTodos) =>

      prevTodos.filter((todo) => todo.id <= idCounter.current)
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  // useEffect(()=>{
  //   const storeditems=sessionStorage.getItem('todos');
  //   let parsedTodos = JSON.parse(storeditems || "[]");
  //   //parseditems =  JSON.parse(storeditems) || [];
  //   setTodos(parsedTodos);
  // },[]);
  // useEffect(() => {
  //   sessionStorage.setItem("todos", JSON.stringify(todos));
    
  // }, [todos]);
  

  // useEffect(() => {
  //   // Fetch todos from local storage on component mount
  //   const storedTodos = JSON.parse(sessionStorage.getItem('todos') || '[]') as Item[];
  //   setTodos(storedTodos);

  //   // Fetch todos from the external source
  //   fetch('https://dummyjson.com/todos')
  //     .then(res => {
  //       if (!res.ok) {
  //         throw new Error(`HTTP error! Status: ${res.status}`);
  //       }
  //       return res.json();
  //     })
  //     .then((data) => {
  //       if (data && data.todos && Array.isArray(data.todos)) {
  //         const newTodos = data.todos.map((todo: Item) => ({
  //           id: todo.id,
  //           todo: todo.todo,
  //           completed: todo.completed
  //         }));
  //         // Update state with the combined todos from local storage and the external source
  //         setTodos([...storedTodos, ...newTodos]);
  //         // Store the combined todos in local storage
  //         sessionStorage.setItem('todos', JSON.stringify([...storedTodos, ...newTodos]));

  //       } else {
  //         console.error("Invalid response format. Expected 'todos' array.");
  //       }
  //     })
  //     .catch(error => {
  //       console.error("Error fetching todos:", error);
  //     });
  // }, []); 


  


  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    let parsedTodos = JSON.parse(savedTodos || "[]");
    if (parsedTodos.length) {
      setTodos(parsedTodos);
      setLastId(parsedTodos[parsedTodos.length - 1].id);
    }

    const fetchData = async () => {
      try {
        const response = await fetch('https://dummyjson.com/todos');
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        const data = await response.json();
        setTodos(updateTodos(todos, data));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, ['https://dummyjson.com/todos']);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos))
    }, [todos])


    function updateTodos(existingTodos: Item[], newTodos: Item[]): Item[] {
  const mergedTodos = [...existingTodos];
  newTodos.forEach(newTodo => {
    const existingIndex = mergedTodos.findIndex(todo => todo.id === newTodo.id);
    if (existingIndex !== -1) {
      mergedTodos[existingIndex] = { ...mergedTodos[existingIndex], ...newTodo };
    } else {
      mergedTodos.push(newTodo);
    }
  });
  return mergedTodos;
}
  const todoCount = todos.length;

  return (
    <div className="main-container">
      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Todo List</h1>
      <p>Total Todos: {todoCount}</p>
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
      
      <div className="list-container scrollbar" style={{maxHeight:'300px', overflowY:'auto'}}>
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

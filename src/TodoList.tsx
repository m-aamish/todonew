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
    {"id":31,"todo":"Do something nice for someone I care about","completed":true},{"id":32,"todo":"Memorize the fifty states and their capitals","completed":false},{"id":33,"todo":"Watch a classic movie","completed":false},{"id":34,"todo":"Contribute code or a monetary donation to an open-source software project","completed":false},{"id":35,"todo":"Solve a Rubik's cube","completed":false},{"id":36,"todo":"Bake pastries for me and neighbor","completed":false},{"id":37,"todo":"Go see a Broadway production","completed":false},{"id":38,"todo":"Write a thank you letter to an influential person in my life","completed":true},{"id":39,"todo":"Invite some friends over for a game night","completed":false},{"id":40,"todo":"Have a football scrimmage with some friends","completed":false},{"id":41,"todo":"Text a friend I haven't talked to in a long time","completed":false},{"id":42,"todo":"Organize pantry","completed":true},{"id":43,"todo":"Buy a new house decoration","completed":false},{"id":44,"todo":"Plan a vacation I've always wanted to take","completed":false},{"id":45,"todo":"Clean out car","completed":false},{"id":46,"todo":"Draw and color a Mandala","completed":true},{"id":47,"todo":"Create a cookbook with favorite recipes","completed":false},{"id":48,"todo":"Bake a pie with some friends","completed":false},{"id":49,"todo":"Create a compost pile","completed":true},{"id":50,"todo":"Take a hike at a local park","completed":true},{"id":51,"todo":"Take a class at local community center that interests you","completed":false},{"id":52,"todo":"Research a topic interested in","completed":false},{"id":53,"todo":"Plan a trip to another country","completed":true},{"id":54,"todo":"Improve touch typing","completed":false},{"id":55,"todo":"Learn Express.js","completed":false},{"id":56,"todo":"Learn calligraphy","completed":false},{"id":57,"todo":"Have a photo session with some friends","completed":false},{"id":58,"todo":"Go to the gym","completed":false},{"id":59,"todo":"Make own LEGO creation","completed":false},{"id":60,"todo":"Take cat on a walk","completed":false}
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
    
    // setTodos((prevTodos) =>

    //   prevTodos.filter((todo) => todo.id <= idCounter.current)
    // );
    setTodos([]);
    // Optionally, if you want to reset the idCounter as well
    idCounter.current = 0;
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
      // Update todos and idCounter
      setTodos(parsedTodos);
      idCounter.current = parsedTodos[parsedTodos.length - 1].id + 1;
    }
  }, []);

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

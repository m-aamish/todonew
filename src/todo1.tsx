// TodoList.tsx
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';

interface Item {
  id: number;
  todo: string;
  completed: boolean;
}

export const Todo1: React.FC = () => {
  const [todoList, setTodoList] = useState<Item[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');

  const fetchData = async () => {
    try {
      const response = await fetch('https://dummyjson.com/todos');
      const data: Item[] = await response.json();
      console.log(data); // Add this line to check the structure of the fetched data
      setTodoList(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const storedData = localStorage.getItem('todoList');
    if (storedData) {
      setTodoList(JSON.parse(storedData));
    } else {
      fetchData();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList]);

  const handleCheckboxChange = (itemId: number) => {
    setTodoList((prevTodoList) =>
      prevTodoList.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (newTodo.trim() === '') {
      return; // Don't add empty to-do items
    }

    const newItem: Item = {
      id: Date.now(),
      todo: newTodo.trim(),
      completed: false,
    };

    setTodoList((prevTodoList) => [...prevTodoList, newItem]);
    setNewTodo('');
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">To-Do List</h1>

      <form onSubmit={handleFormSubmit} className="mb-4">
        <div className="flex items-center">
          <input
            type="text"
            value={newTodo}
            onChange={handleInputChange}
            placeholder="Add a new to-do"
            className="flex-grow p-2 border border-gray-300 rounded-md mr-2 focus:outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      </form>

      {todoList.length === 0 ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <ul className="list-none p-0">
          {todoList.map((item) => (
            <li
              key={item.id}
              className="mb-4 bg-white p-4 rounded-md shadow-md flex items-center"
            >
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => handleCheckboxChange(item.id)}
                className="mr-4"
              />
              <span
                className={`text-lg ${item.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}
              >
                {item.todo}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
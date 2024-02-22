import React, { useState } from 'react';
import './App.css'; // Импортируем стили

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleAddTodo = () => {
        if (inputValue.trim() !== '') {
            setTodos([...todos, { id: Date.now(), text: inputValue, completed: false, deleted: false }]);
            setInputValue('');
        }
    };

    const handleToggleTodo = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const handleDeleteTodo = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, deleted: true } : todo
            )
        );

        setTimeout(() => {
            setTodos(todos.filter((todo) => todo.id !== id && !todo.deleted));
        }, 2000);
    };

    const handleEditTodo = (id) => {
        const todoToEdit = todos.find((todo) => todo.id === id);
        setEditId(id);
        setEditText(todoToEdit.text);
    };

    const handleSaveEdit = () => {
        setTodos(
            todos.map((todo) =>
                todo.id === editId ? { ...todo, text: editText } : todo
            )
        );
        setEditId(null);
        setEditText('');
    };

    return (
        <div className="container">
            <h1>To-Do List</h1>
            <div className="add-task-container">
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Enter your task"
                    className="input-task"
                />
                <button
                    onClick={handleAddTodo}
                    className="add-task-button"
                >
                    Add Task
                </button>
            </div>
            <ul className="todo-list">
                {todos.map((todo) => (
                    <li key={todo.id} className="todo-item">
                        {editId === todo.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    className="edit-input"
                                />
                                <button onClick={handleSaveEdit}>
                                    <i className="fa fa-pencil"></i> {/* Иконка карандаша */}
                                </button>
                            </>
                        ) : (
                            <>
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => handleToggleTodo(todo.id)}
                                    className="toggle-checkbox"
                                />
                                <span
                                    className={`${todo.completed || todo.deleted ? 'deleted' : ''}`}
                                >
                                    {todo.text}
                                </span>
                                <button onClick={() => handleEditTodo(todo.id)}>

                                    Edit
                                </button>

                                <button
                                    onClick={() => handleDeleteTodo(todo.id)}
                                    className="delete-button"
                                >
                                    Delete
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;

import { useState, useEffect } from "react";
import Todolist from "./Todolist";

export default function Todoform() {
  const [inputStore, setInputstore] = useState([]);
  const [todolist, setTodolist] = useState([]);
  const [editInput, setEditInput] = useState([]);
  const [deneme, setDeneme] = useState(false);

  const savedItems = JSON.parse(localStorage.getItem("todolist-items"));

  useEffect(() => {
    setTodolist(savedItems);
  }, []);

  const randomNumber = (Math.random() * 100).toFixed(0);
  const onChangeInputform = (event) => {
    const inputValue = event.target.value;
    setInputstore(inputValue);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    const newTodos = todolist;
    const task = {
      name: inputStore,
      done: false,
      id: randomNumber,
    };
    if (inputStore.length > 0) {
      newTodos.push(task);
    }
    setTodolist(newTodos);
    saveToLocalStorage(todolist);
    setInputstore([]);
    setEditInput([]);
  };

  const editHandler = (index, event) => {
    setEditInput(event.target.value);
  };
  const submitEdit = (index, event) => {
    event.preventDefault();
    const editTodo = todolist;
    editTodo[index].name = editInput;
    setTodolist(editTodo);
    saveToLocalStorage(todolist);
    setEditInput([setDeneme()]);
  };

  const deleteHandler = (index) => {
    const copyList = todolist;
    copyList.splice(index, 1);
    setTodolist(copyList);
    saveToLocalStorage(todolist);
    setDeneme(!deneme);
  };

  const completed = (index) => {
    todolist[index].done = !todolist[index].done;
    setTodolist(todolist);
    saveToLocalStorage(todolist);
    setDeneme(!deneme);
  };

  const saveToLocalStorage = (item) => {
    localStorage.setItem("todolist-items", JSON.stringify(item));
    setDeneme(!deneme);
  };

  return (
    <div className="todoform-container">
      <Todolist
        todolist={todolist}
        setTodolist={setTodolist}
        editHandler={editHandler}
        editInput={editInput}
        submitEdit={submitEdit}
        completed={completed}
        deleteHandler={deleteHandler}
      />
      <form onSubmit={onSubmit} className="todoform-form">
        <input
          className="todoform-input"
          type="text"
          value={inputStore}
          onChange={(event) => onChangeInputform(event)}
          placeholder="Yes, I have..."
        />
      </form>
    </div>
  );
}

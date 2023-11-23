import React, { useEffect, useState } from "react";
import { dataBase, auth } from "../firebase.utils";
import firebase from "firebase/compat/app";
import "../App.css";
import TodoItem from "./TodoItem";

function TodoApp() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const userTodoCollection = dataBase.collection(`users/${user.id}/todos`);

      userTodoCollection.orderBy("timestamp", "desc").onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            todo: doc.data().todo,
            timestamp: doc.data().timestamp,
          }))
        );
      });
    }
  }, [user]);

  const addTodo = (e) => {
    e.preventDefault();

    if (user) {
      const userTodoCollection = dataBase.collection(`users/${user.id}/todos`);
      userTodoCollection.add({
        todo: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });

      setInput("");
    }
  };

  return (
    <div className="App ">
      <div className="card border-0 secondary-background-color text-white ">
        <h1 className="title">TODO LIST</h1>
        <form className="input-group mb-3">
          <input
            type="text"
            className="form-control me-3 rounded"
            placeholder="Add todo"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <button
            type="submit"
            className="btn orange_color_bg text-white rounded addTodo"
            onClick={addTodo}
            disabled={input.trim() === ""}
          >
            ADD TODO
          </button>
        </form>
      </div>
      <div className="card secondary-background-color text-white">
        <table className="table">
          <thead className="text-white">
            <tr>
              <th scope="col" className="table-heading">
                ID
              </th>
              <th scope="col" className="table-heading">
                TODO
              </th>
              <th scope="col" className="table-heading">
                EDIT
              </th>
              <th scope="col" className="table-heading">
                REMOVE
              </th>
            </tr>
          </thead>
          <tbody>
            {todos.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center orange_color">
                  {user ? "ADD YOUR DAILY TASK" : "LOGIN FOR ADDING YOUR TASK"}
                </td>
              </tr>
            ) : (
              todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} userId={user.id} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TodoApp;

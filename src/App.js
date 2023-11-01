import React, { useEffect, useState } from "react";
import "./App.css";
import { dataBase } from "./firebase.utils";
import firebase from "firebase/compat/app";

function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    dataBase
      .collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            todo: doc.data().todo,
            timestamp: doc.data().timestamp,
          }))
        );
      });
  }, []);

  console.log(todos);

  const addTodo = (e) => {
    e.preventDefault();
    dataBase.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div className="App">
      <div className="card">
        <h1>TODO APP</h1>
        <form className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <button
            type="submit"
            className="btn btn-primary"
            onClick={addTodo}
            disabled={!input}
          >
            ADD TASK
          </button>
        </form>
      </div>
      <div className="card">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">TODO</th>
              <th scope="col">ACTION</th>
              <th scope="col">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => {
              return (
                <tr key={todo.id}>
                  <th>{todo.id}</th>
                  <th>{todo.todo}</th>
                  <th>
                    <button
                      className="btn btn-success"
                      disabled={!input}
                      onClick={() => {
                        dataBase.collection("todos").doc(todo.id).update({
                          todo: input,
                          timestamp:
                            firebase.firestore.FieldValue.serverTimestamp(),
                        });
                      }}
                    >
                      Update
                    </button>
                  </th>
                  <th>
                    <button
                      className="btn btn-danger"
                      onClick={(e) =>
                        dataBase.collection("todos").doc(todo.id).delete()
                      }
                    >
                      Remove
                    </button>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;

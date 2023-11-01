import React, { useState } from "react";
import "./App.css";
import { dataBase } from "./firebase.utils";
import firebase from "firebase/compat/app";

function App() {
  const [input, setInput] = useState("");

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
        <h1>TODO LIST</h1>
        <form className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <button type="submit" className="btn btn-primary" onClick={addTodo}>
            ADD TASK
          </button>
        </form>
      </div>
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">TODO</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <th>Hello</th>
              <th>
                <button className="btn btn-success">Update</button>
              </th>
              <th>
                <button className="btn btn-danger">Delete</button>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;

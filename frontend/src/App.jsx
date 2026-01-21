import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  return (
    <>
      <h1>Tasks List</h1>
      <div class="add-form">
        <input type="text" id="input" placeholder="Add a new task" />
        <button id="add">Add Task</button>
      </div>

      <ul id="todos"></ul>
    </>
  );
}

export default App;

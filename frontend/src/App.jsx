import { useEffect, useState } from "react";
import axios from "axios";

const initialFormState = {
  title: "",
  description: "",
  status: false,
};

const stringRegex = /^(?=.*[A-Za-z])[A-Za-z0-9\s\W]+$/;

function validateString(string) {
  return stringRegex.test(string);
}

function App() {
  const [tasks, setTasks] = useState([]);

  const [form, setForm] = useState(initialFormState);

  const getTasks = async () => {
    const tasks = await axios.get("http://localhost:3000/api/tasks/");
    setTasks(tasks.data);
  };

  useEffect(() => {
    getTasks();
  }, []);

  console.log("state tasks", tasks);

  //   {
  //     "_id": "696f8ac5c7e321d811b2f955",
  //     "title": "Test",
  //     "description": "Test description",
  //     "status": false,
  //     "createdAt": "2026-01-20T14:01:41.427Z",
  //     "updatedAt": "2026-01-20T14:01:41.427Z",
  //     "__v": 0
  // }

  async function handleAddTask(e) {
    e.preventDefault();

    if (!validateString(form.title)) alert("Enter valid title");
    if (!validateString(form.description)) alert("Enter valid description");

    try {
      await axios.post("http://localhost:3000/api/tasks/", {
        title: form.title,
        description: form.description,
        status: form.status,
      });
      setForm(initialFormState);
      await getTasks();
    } catch (error) {
      console.warn(error);
    }
    console.log("task submitted");
  }

  console.log("Form", form);

  return (
    <>
      <h1>Tasks List</h1>
      <form className="add-form" onSubmit={handleAddTask}>
        <input
          type="text"
          id="input"
          placeholder="Add a new task"
          required
          value={form.title}
          onChange={(e) =>
            setForm({
              ...form,
              title: e.target.value,
            })
          }
        />
        <textarea
          placeholder="Enter task description"
          required
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
        />
        <div
          style={{
            display: "flex",
            gap: "1em",
            alignItems: "center",
            width: "100%",
          }}
        >
          <input
            id="status"
            type="checkbox"
            checked={form.status}
            onChange={(e) =>
              setForm({
                ...form,
                status: e.target.checked,
              })
            }
          />
          <label
            htmlFor="status"
            id="status"
            style={{
              width: "100%",
            }}
          >
            Task Completed
          </label>
        </div>
        <button id="add" type="submit">
          Add Task
        </button>
      </form>

      <ul id="todos">
        {tasks.map((task) => (
          <div key={task._id}>
            <li>
              {task.title} :{" "}
              <span
                style={{
                  fontSize: "10px",
                }}
              >
                {task.description}
              </span>
            </li>

            <button
              onClick={() => {
                console.log("toggle pressed");
              }}
              id="toggle-button"
              className={task?.status ? "completed" : ""}
            >
              {task.status ? "Mark Not Done" : "Mark Done"}
            </button>
            <button
              id="delete-button"
              onClick={() => {
                console.log("delete pressed");
              }}
            >
              Delete Task
            </button>
          </div>
        ))}
      </ul>
    </>
  );
}

export default App;

import { useEffect, useMemo, useState } from "react";
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

  // const [filteredData, setFilteredData] = useState(tasks);

  const [form, setForm] = useState(initialFormState);

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");

  const [editTask, setEditTask] = useState({
    id: "",
    ...initialFormState,
  });

  const getTasks = async () => {
    const tasks = await axios.get("http://localhost:3000/api/tasks/");
    setTasks(tasks.data);
  };

  useEffect(() => {
    getTasks();
  }, []);

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

    if (tasks.some((t) => t.title === form.title)) {
      return alert("Duplicate title is not allowed");
    }

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

  async function handleEditTask(e) {
    e.preventDefault();

    if (editTask.title && !validateString(editTask.title))
      alert("Enter valid title");
    if (editTask.description && !validateString(editTask.description))
      alert("Enter valid description");

    try {
      await axios.put("http://localhost:3000/api/tasks/" + editTask.id, {
        title: editTask.title,
        description: editTask.description,
        status: editTask.status,
      });
      setEditTask({
        id: "",
        ...initialFormState,
      });
      await getTasks();
    } catch (error) {
      console.warn(error);
    }
    console.log("task submitted");
  }

  async function handleToggleTask(id) {
    const taskToToggle = tasks.find((task) => task._id === id);

    await axios.put(`http://localhost:3000/api/tasks/${taskToToggle._id}`, {
      status: !taskToToggle.status,
    });
    await getTasks();
  }
  async function handleDeleteTask(id) {
    await axios.delete(`http://localhost:3000/api/tasks/${id}`);
    await getTasks();
  }

  // const handleSearch = (e) => {
  //   const searchQuery = e.target.value;
  //   if (!searchQuery) return;
  //   setQuery(e.target.value);
  //   const filteredResults = tasks.filter((task) => {
  //     return (
  //       task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       task.description.toLowerCase().includes(searchQuery.toLowerCase())
  //     );
  //   });
  //   setFilteredData(filteredResults);
  // };

  const filteredData = useMemo(() => {
    console.log("status", status);
    console.log("query", query);

    return tasks.filter((task) => {
      const matchesQuery =
        task.title.toLowerCase().includes(query.toLowerCase()) ||
        task.description.toLowerCase().includes(query.toLowerCase());

      const matchesStatus =
        status === "" ? true : task.status === (status === "true");

      return matchesQuery && matchesStatus;
    });
  }, [tasks, query, status]);

  console.log("tasks", tasks);
  console.log("filtered tasks", filteredData);

  return (
    <>
      <h1>Tasks List</h1>
      {editTask && editTask.id ? (
        <>
          <form className="add-form" onSubmit={handleEditTask}>
            <input
              type="text"
              id="input"
              placeholder="Add a new task"
              required
              value={editTask.title}
              onChange={(e) =>
                setEditTask({
                  ...editTask,
                  title: e.target.value,
                })
              }
            />
            <textarea
              placeholder="Enter task description"
              required
              value={editTask.description}
              onChange={(e) =>
                setEditTask({
                  ...editTask,
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
                checked={editTask.status}
                onChange={(e) =>
                  setEditTask({
                    ...editTask,
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
            <div
              style={{
                display: "flex",
                gap: "1em",
              }}
            >
              <button
                id="cancel"
                type="button"
                onClick={() => {
                  setEditTask({
                    id: "",
                    ...initialFormState,
                  });
                }}
              >
                Cancel
              </button>
              <button id="add" type="submit">
                Save Task
              </button>
            </div>
          </form>
        </>
      ) : (
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
      )}
      <div>
        <input
          type="search"
          name="search-tasks"
          id="search-tasks"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <select
          name="status"
          id="task-status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All</option>
          <option value="true">Completed</option>
          <option value="false">Not Completed</option>
        </select>
      </div>
      <ul id="todos">
        {filteredData.map((task) => (
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
              type="button"
              onClick={() => {
                console.log("toggle pressed", task);
                handleToggleTask(task._id);
              }}
              id="toggle-button"
              className={task?.status ? "completed" : ""}
            >
              {task.status ? "Mark Not Done" : "Mark Done"}
            </button>
            <button
              type="button"
              onClick={() => {
                setEditTask({
                  id: task._id,
                  title: task.title,
                  description: task.description,
                  status: task.status,
                });
              }}
              id="edit-button"
            >
              Edit
            </button>
            <button
              type="button"
              id="delete-button"
              onClick={() => {
                console.log("delete pressed");
                handleDeleteTask(task._id);
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

import { Pagination } from "./pagination";
import { EditTask } from "./edit-task";
import { AddTask } from "./add-task";
import { TasksFilters } from "./tasks-filters";
import { TasksList } from "./tasks-list";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import validateString from "../utils/validate-string";

const initialFormState = {
  title: "",
  description: "",
  status: false,
};

function TaskManager() {
  const [tasks, setTasks] = useState([]);

  const [form, setForm] = useState(initialFormState);

  const [query, setQuery] = useState("");

  const [status, setStatus] = useState("");

  const [pageLimit, setPageLimit] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(0);

  const [editTask, setEditTask] = useState({
    id: "",
    ...initialFormState,
  });

  const getTaskUrl = `http://localhost:3000/api/tasks/?page=${currentPage}&limit=${pageLimit}`;

  const getTasks = async () => {
    const tasks = await axios.get(getTaskUrl);
    setTasks(tasks.data?.tasks);
    setCurrentPage(tasks.data?.currentPage);
    setTotalPages(tasks.data?.totalPages);
  };

  useEffect(() => {
    getTasks();
  }, [pageLimit, currentPage]);

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

  const filteredData = useMemo(() => {
    return tasks.filter((task) => {
      const matchesQuery =
        task.title.toLowerCase().includes(query.toLowerCase()) ||
        task.description.toLowerCase().includes(query.toLowerCase());

      const matchesStatus =
        status === "" ? true : task.status === (status === "true");

      return matchesQuery && matchesStatus;
    });
  }, [tasks, query, status]);

  return (
    <>
      <h1>Tasks List</h1>

      {editTask && editTask.id ? (
        <EditTask
          handleEditTask={handleEditTask}
          setEditTask={setEditTask}
          editTask={editTask}
          initialFormState={initialFormState}
        />
      ) : (
        <AddTask handleAddTask={handleAddTask} setForm={setForm} form={form} />
      )}

      <TasksFilters
        query={query}
        setQuery={setQuery}
        status={status}
        setStatus={setStatus}
      />

      <TasksList
        data={filteredData}
        handleToggleTask={handleToggleTask}
        setEditTask={setEditTask}
        handleDeleteTask={handleDeleteTask}
      />

      <Pagination
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        pageLimit={pageLimit}
        setPageLimit={setPageLimit}
      />
    </>
  );
}

export default TaskManager;

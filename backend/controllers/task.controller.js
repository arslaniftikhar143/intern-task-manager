const {
  taskList,
  findTaskById,
  createTask,
  editTask,
  deleteTask,
} = require("../services/task.service.js");

const { isIdValid } = require("../utils/validate-id.js");

const { validateString } = require("../utils/validate-string.js");

async function handleGetTasks(req, res) {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const { tasks, count } = await taskList({ limit, page });

  res.status(200).json({
    tasks,
    currentPage: page,
    totalPages: Math.ceil(count / limit),
  });
}
async function handleGetTask(req, res) {
  try {
    if (!isIdValid(req.params.id))
      return res.status(400).send("Task Id is not valid");

    const task = await findTaskById(req.params.id);

    if (!task) {
      return res.status(404).send("Task not found. Please provide valid Id.");
    }

    res.status(200).json(task);
  } catch (error) {
    console.log(error);
  }
}

async function handleCreateTask(req, res) {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .send("Title, Description and Status are required fields");
    }

    if (!validateString(title)) {
      return res.status(400).send("Please enter valid title");
    }
    if (!validateString(description)) {
      return res.status(400).send("Please enter valid description");
    }

    const createdTask = createTask({
      title,
      description,
    });

    res.status(200).json({
      id: createdTask._id,
      message: "Task created sucessfully!",
    });
  } catch (error) {
    console.log(error);
  }
}

async function handleEditTask(req, res) {
  try {
    const { title, description, status } = req.body;
    const { id } = req.params;

    if (!id) return res.status(400).send("Please provide task id.");

    if (!isIdValid(id)) return res.status(400).send("Task Id is not valid");

    const alredyxistingTask = await findTaskById(id);

    if (!alredyxistingTask) {
      return res
        .status(404)
        .send("Task not found. Please provide valid task Id");
    }

    if (!validateString(title)) {
      return res.status(400).send("Please enter valid title");
    }
    if (!validateString(description)) {
      return res.status(400).send("Please enter valid description");
    }

    const editedTask = await editTask({ id, title, description, status });

    res.status(200).json({
      id: editedTask._id,
      message: "Task edited sucessfully!",
    });
  } catch (error) {
    console.log(error);
  }
}

async function handleDeleteTask(req, res) {
  try {
    if (!req.params.id) return res.status(404).send("Please provide task id.");

    if (!isIdValid(req.params.id))
      return res.status(400).send("Task Id is not valid");

    const alredyxistingTask = await findTaskById(req.params.id);

    if (!alredyxistingTask) {
      return res
        .status(404)
        .send("Task not found. Please provide valid task Id");
    }

    await deleteTask(req.params.id);

    res.status(200).json({
      message: "Task deleted sucessfully!",
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  handleGetTasks,
  handleCreateTask,
  handleEditTask,
  handleDeleteTask,
  handleGetTask,
};

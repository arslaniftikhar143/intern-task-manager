const Task = require("../models/task.models.js");
const { validateString } = require("../utils/validate-string.js");

async function handleGetTasks(req, res) {
  const tasks = await Task.find({});
  res.status(200).json(tasks);
}
async function handleGetTask(req, res) {
  const task = await Task.findById(req.params.id);
  res.status(200).json(task);
}

async function handleCreateTask(req, res) {
  const { title, description, status } = req.body;

  //   if (!title || !description || !status) {
  //     return res.status(400).send("All fields are required");
  //   }

  if (!validateString(title)) {
    return res.status(400).send("Please enter valid title");
  }
  if (!validateString(description)) {
    return res.status(400).send("Please enter valid description");
  }

  const createTask = await Task.create({
    title,
    description,
    status,
  });

  res.status(200).json({
    id: createTask._id,
    message: "Task created sucessfully!",
  });
}

async function handleEditTask(req, res) {
  const { title, description, status } = req.body;

  if (!validateString(title)) {
    return res.status(400).send("Please enter valid title");
  }
  if (!validateString(description)) {
    return res.status(400).send("Please enter valid description");
  }

  const editedTask = await Task.findByIdAndUpdate(
    req.params.id,
    {
      title,
      description,
      status,
    },
    { new: true },
  );

  res.status(200).json({
    id: editedTask._id,
    message: "Task edited sucessfully!",
  });
}

async function handleDeleteTask(req, res) {
  await Task.findByIdAndDelete(req.params.id);

  res.status(200).json({
    message: "Task deleted sucessfully!",
  });
}

module.exports = {
  handleGetTasks,
  handleCreateTask,
  handleEditTask,
  handleDeleteTask,
  handleGetTask,
};

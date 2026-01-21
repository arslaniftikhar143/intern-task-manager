const Task = require("../models/task.models.js");
const { validateString } = require("../utils/validate-string.js");

async function handleGetTasks(req, res) {
  const tasks = await Task.find({});
  res.status(200).json(tasks);
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

module.exports = { handleGetTasks, handleCreateTask };

const Task = require("../models/task.models.js");

async function taskList({ limit, page }) {
  const tasks = await Task.find({})
    .skip(limit * (page - 1))
    .limit(limit)
    .sort({ _id: -1 });
  const count = await Task.countDocuments();

  return { tasks, count };
}
async function findTaskById(id) {
  const task = await Task.findById(id);
  return task;
}
async function createTask({ title, description }) {
  const createdTask = await Task.create({
    title,
    description,
    status: false,
  });
  return createdTask;
}

async function editTask({ id, title, description, status }) {
  const editedTask = await Task.findByIdAndUpdate(
    id,
    {
      title,
      description,
      status,
    },
    { new: true },
  );
  return editedTask;
}

async function deleteTask(id) {
  await Task.findByIdAndDelete(id);
}

module.exports = {
  taskList,
  findTaskById,
  createTask,
  editTask,
  deleteTask,
};

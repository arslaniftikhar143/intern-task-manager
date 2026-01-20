const router = require("express").Router();
const Task = require("../models/task.models");

router.get("/tasks", async (req, res) => {
  const tasks = await Task.find({});
  res.send(tasks);
});

router.post("/tasks", async (req, res) => {
  const { title, description, status, createdAt } = req.body;

  if (title || description || status || createdAt) {
    res.status(400).send("All fields are required");
    return;
  }

  const createTask = await Task.create({
    title,
    description,
    status,
    createdAt,
  });
  res.send(tasks);
});

module.exports = router;

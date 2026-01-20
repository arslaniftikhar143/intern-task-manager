const router = require("express").Router();
const Task = require("../models/task.models.js");

router.get("/", async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json(tasks);
});

router.post("/", async (req, res) => {
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

  res.status(200).json({
    message: "Task created sucessfully!",
  });
});

module.exports = router;

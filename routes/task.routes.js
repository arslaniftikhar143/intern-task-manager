const router = require("express").Router();
const Task = require("../models/task.models.js");

function validateString(title) {
  const regex = /^[A-Za-z][A-Za-z0-9 ]*$/;
  return regex.test(title);
}

router.get("/", async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json(tasks);
});

router.post("/", async (req, res) => {
  const { title, description, status } = req.body;

  console.log(req.body);

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
    message: "Task created sucessfully!",
  });
});

module.exports = router;

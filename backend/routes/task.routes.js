const {
  handleGetTasks,
  handleCreateTask,
} = require("../controllers/task.controller");

const router = require("express").Router();

router.get("/", handleGetTasks);
router.post("/", handleCreateTask);

module.exports = router;

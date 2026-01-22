const {
  handleGetTasks,
  handleCreateTask,
  handleEditTask,
  handleDeleteTask,
  handleGetTask,
} = require("../controllers/task.controller");

const router = require("express").Router();

router.get("/", handleGetTasks);
router.post("/", handleCreateTask);
router.put("/:id", handleEditTask);
router.delete("/:id", handleDeleteTask);
router.get("/:id", handleGetTask);

module.exports = router;

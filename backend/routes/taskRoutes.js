const express = require("express");
const { createTask, getAllTasks, getTaskById, updateTask, deleteTask } = require("../controllers/taskController");
const protect = require("../middleware/protectMiddleware");
const router = express.Router();

router.post("/", protect, createTask);
router.get("/", protect, getAllTasks);
router.get("/:id", protect, getTaskById);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

module.exports = router;
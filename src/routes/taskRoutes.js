const express = require("express");
const router = express.Router();
const {
  createTask,
  updateTask,
  getTask,
  getTaskId,
  deleteTask
} = require("../controllers/taskController");
const {protect} = require('../middleware/authMiddleware')



router.route("/").post(protect, createTask).get(protect, getTask);
router.route("/:id").get(protect, getTaskId).delete(protect, deleteTask).patch(protect, updateTask);


module.exports = router;

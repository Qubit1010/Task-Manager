const express = require("express");
const router = express.Router();
const {
  createTask,
  getTask,
  getTaskId,
  deleteTask
} = require("../controllers/taskController");

router.route("/").post(createTask).get(getTask);
router.route("/:id").get(getTaskId).delete(deleteTask);


module.exports = router;

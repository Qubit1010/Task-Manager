const asyncHandler = require("express-async-handler");
const Task = require("../models/taskModel");

// @desc Create New Task
// @route POST /tasks
// @access Public
const createTask = asyncHandler(async (req, res) => {
  const { description, completed } = req.body;

  if (!description || !completed) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const task = await Task.create({
    description: description,
    completed: completed,
  });

  // console.log(task);
  // res.status(200).json(task);

  if (task) {
    res.status(201).json(task);
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

// @desc Get task Data
// @route GET /tasks/getTasks
// @access Private
const getTask = asyncHandler(async (req, res) => {
  const tasks = await Task.find();

  res.status(200).json(tasks);
});


//@desc Get task Data with id
// @route GET /tasks/me
// @access Private
const getTaskId = asyncHandler(async (req, res) => {
  // const _id = req.params.id
  const { _id, description, completed } = await Task.findById(req.params.id);

  // const user = await User.findById(_id);
  // const user = await User.find()
  // res.status(200).json(user)
  try {
    res.status(200).json({
      id: _id,
      description,
      completed,
    });
  } catch (error) {
    res.status(500);
    throw new Error("User not found!");
  }
});

// @desc Get task
// @route DELETE /tasks/:id
// @access Private
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id)

  if (!task) {
    res.status(400)
    throw new Error('task not found')
  }

  // Check for user
  // if (!req.user) {
  //   res.status(401)
  //   throw new Error('User not found')
  // }

  // Make sure the logged in user matches the task user
  // if (task.user.toString() !== req.user.id) {
  //   res.status(401)
  //   throw new Error('User not authorized')
  // }

  res.status(200).json({ id: req.params.id })
})

module.exports = { createTask, getTask, getTaskId, deleteTask};

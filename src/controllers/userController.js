const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// @desc Register New User
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).json({ user, token: generateToken(user._id) });
  } catch (e) {
    res.status(400).send(e);
  }

  // const { name, email, password, age } = req.body;
  // if (!name || !email || !password || !age) {
  //   res.status(400);
  //   throw new Error("Please add all fields");
  // }
  // check if user exists
  // const userExists = await User.findOne({ email });
  // if (userExists) {
  //   res.status(400);
  //   throw new Error("User already exists");
  // }

  // Hash password
  // const salt = await bcrypt.genSalt(10);
  // const hashedPassword = await bcrypt.hash(password, salt);
  // // Create user
  // const user = await User.create({
  //   name,
  //   email,
  //   password: hashedPassword,
  //   age,
  // });

  // if (user) {
  //   res.status(201).json({
  //     _id: user.id,
  //     name: user.name,
  //     email: user.email,
  //     age: user.age,
  // token: generateToken(user._id)
  //   });
  // } else {
  //   res.status(400);
  //   throw new Error("Invalid User Data");
  // }
});

// @desc Authenticate a user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

// @desc Update users
// @route PUT /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
  // const { _id, name, email, password, age } = req.body;
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    // const user = await User.findById(req.params.id);
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }

  // const salt = await bcrypt.genSalt(10);
  // const hashedPassword = await bcrypt.hash(password, salt);

  // const user = await User.findById(req.params.id);
  // if (!user) {
  //   res.status(400);
  //   throw new Error("user not found");
  // }
  // const task = await Task.findById(req.user.id)
  // Check for user
  // if (!req.user) {
  //   res.status(401)
  //   throw new Error('User not found')
  // }
  // Make sure the logged in user matches the goal user
  // if (goal.user.toString() !== req.user.id) {
  //   res.status(401)
  //   throw new Error('User not authorized')
  // }
  // const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
  //   new: true,
  // });
  // res.status(200).json(updatedUser);
});

// @desc Get User Data
// @route GET /users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// Generate Token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, "abc123123", {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  getMe,
};

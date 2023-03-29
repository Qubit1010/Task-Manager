const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  updateUser,
  getMe,
} = require("../controllers/userController");
// const {protect} = require('../middleware/authMiddleware')


router.post("/", registerUser);
router.post("/login", loginUser);
router.route("/:id").get(getMe).patch(updateUser);

module.exports = router;

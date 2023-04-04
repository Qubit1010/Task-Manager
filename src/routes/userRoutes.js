const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  updateUser,
  getMe,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const multer = require("multer");
const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload a image"));
    }

    cb(undefined, true);
  },
});

router.post("/me/avatar", protect, upload.single("avatar"), async (req, res) => {
  req.user.avatar = req.file.buffer
  await req.user.save()
  res.send()
},
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.patch("/me", protect, updateUser);

module.exports = router;

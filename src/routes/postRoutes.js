const express = require("express");
const {
  getUserPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getUserPosts);
router.get("/:id", protect, getPost);
router.post("/", protect, createPost);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);

module.exports = router;

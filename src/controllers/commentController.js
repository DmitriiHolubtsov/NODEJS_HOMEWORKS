const Comment = require("../models/Comment");
const Post = require("../models/Post");

const createComment = async (req, res) => {
  try {
    const { text, postId } = req.body;
    if (!text || !postId) {
      return res.status(400).json({ message: "Text and postId are required" });
    }
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });
    const comment = new Comment({
      text,
      author: req.user.userId,
      post: postId,
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getCommentsByPost = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId }).populate(
      "author",
      "username email"
    );
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    if (comment.author.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Access denied" });
    }
    comment.text = req.body.text || comment.text;
    await comment.save();
    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    if (comment.author.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Access denied" });
    }
    await comment.deleteOne();
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  createComment,
  getCommentsByPost,
  updateComment,
  deleteComment,
};

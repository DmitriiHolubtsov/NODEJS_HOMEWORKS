const Post = require("../models/Post");

const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ owner: req.user.userId }).populate(
      "owner",
      "username email"
    );
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.owner.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const createPost = async (req, res) => {
  const { title, content } = req.body;
  try {
    const post = new Post({ title, content, owner: req.user.userId });
    const createdPost = await post.save();
    res.status(201).json(createdPost);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const updatePost = async (req, res) => {
  const { title, content } = req.body;
  try {
    const post = await Post.findById(req.params.id);
    if (!post || post.owner.toString() !== req.user.userId) {
      return res
        .status(404)
        .json({ message: "Post not found or not authorized" });
    }
    post.title = title || post.title;
    post.content = content || post.content;
    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post || post.owner.toString() !== req.user.userId) {
      return res
        .status(404)
        .json({ message: "Post not found or not authorized" });
    }
    await post.deleteOne();
    res.json({ message: "Post removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getUserPosts, getPost, createPost, updatePost, deletePost };

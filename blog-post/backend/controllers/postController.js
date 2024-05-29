const asyncErrorHandler = require('../utils/asyncErrorHandler');
const mongoose = require('mongoose');
const Post = require('../models/post');

exports.createPost = asyncErrorHandler(async (req, res) => {
  try {
    const createdPost = await Post.create(req.body);
    res.status(201).json({ message: 'Post created successfully', post: createdPost });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(400).json({ message: 'Error creating post', error: error.message });
  }
});

exports.updatePost = asyncErrorHandler(async (req, res) => {
  const { title, description, author, keyWords } = req.body;

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Invalid post ID' });
    return;
  }

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: { title, description, author, keyWords } },
      { new: true }
    );

    if (!updatedPost) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    res.json({ message: 'Post updated successfully', post: updatedPost });
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(400).json({ message: 'Error updating post', error: error.message });
  }
});

exports.getPosts = asyncErrorHandler(async (req, res) => {
  try {
    const posts = await Post.find();
    res.json({ message: 'Posts fetched successfully', posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

exports.getPost = asyncErrorHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Invalid post ID' });
    return;
  }

  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    res.json({ message: 'Post fetched successfully', post });
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

exports.deletePost = asyncErrorHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Invalid post ID' });
    return;
  }

  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    res.json({ message: 'Post deleted successfully', deletedPost });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

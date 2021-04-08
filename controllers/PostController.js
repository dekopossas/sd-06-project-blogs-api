const { Router } = require('express');
const { status } = require('../middlewares/errorMessage');
const { verifyToken, verifyPostFields } = require('../middlewares/userVerification');
const { addPost, getPosts } = require('../services/BlogService');
const validateToken = require('../auth/validateToken');

const PostController = Router();

PostController.post('/', verifyPostFields, verifyToken, async (req, res) => {
  const { title, content } = req.body;
  const { authorization } = req.headers;
  const { id } = validateToken(authorization);
  const blogData = await addPost({ userTitle: title, userContent: content, userId: id });
  res.status(status.Created).json(blogData);
});

PostController.get('/', verifyToken, async (req, res) => {
  const allPosts = await getPosts();
  res.status(status.Ok).json(allPosts);
});

module.exports = PostController;

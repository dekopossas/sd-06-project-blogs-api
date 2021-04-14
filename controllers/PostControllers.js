const { Router } = require('express');
const { Users } = require('../models');
const { BlogPosts } = require('../models');
const verifyAuthorization = require('../middlewares/verifyAuthorization');
const validateToken = require('../auth/validateToken');

const routes = Router();

routes.post('/', verifyAuthorization, async (req, res) => {
  const { title, content } = req.body;
  const { authorization: token } = req.headers;

  if (!title) return res.status(400).json({ message: '"title" is required' });

  if (!content) return res.status(400).json({ message: '"content" is required' });

  const payload = validateToken(token);
  const user = await Users.findOne({ where: { email: payload.email } });
  const userId = user.dataValues.id;

  return res.status(201).json({ title, content, userId });
});

routes.get('/', verifyAuthorization, async (req, res) => {
  const posts = await BlogPosts.findAll({
    include: { model: Users, as: 'user' },
  });

  return res.status(200).json(posts);
});

routes.get('/:id', verifyAuthorization, async (req, res) => {
  const { id } = req.params;

  const post = await BlogPosts.findOne({
    where: { id },
    include: { model: Users, as: 'user' },
  });

  if (!post) return res.status(404).json({ message: 'Post não existe' });

  return res.status(200).json(post);
});

const getPost = (id) => BlogPosts.findOne({
  where: { id },
  include: { model: Users, as: 'user' },
});

const getUser = (payload, id) => Users.findOne({
  where: { email: payload.email },
  attributes: { id },
});

const updatePost = (post, title, content, id) => BlogPosts.update(
  { ...post, title, content },
  { where: { id } },
);

routes.put('/:id', verifyAuthorization, async (req, res) => {
  const { id } = req.params;
  const { authorization: token } = req.headers;
  const { title, content } = req.body;

  if (!title) return res.status(400).json({ message: '"title" is required' });

  if (!content) return res.status(400).json({ message: '"content" is required' });

  const post = await getPost(id);

  const payload = validateToken(token);

  const user = await getUser(payload, id);

  const userId = Number(post.dataValues.userId);

  if (Number(user.dataValues.id) === Number(post.dataValues.userId)) {
    await updatePost(post, title, content, id);

    return res.status(200).json({ title, content, userId });
  }

  return res.status(401).json({ message: 'Usuário não autorizado' });
});

module.exports = { routes };

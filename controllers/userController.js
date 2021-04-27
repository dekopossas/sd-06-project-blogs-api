const { Router } = require('express');
const models = require('../models');

const UserRouter = new Router();

UserRouter.post('/', async (req, res) => {
  const {
    displayName,
    email,
    password,
    image,
  } = req.body;

  const uniqueEmail = await models.User.findOne({ where: { email } });

  if (uniqueEmail) return res.status(409).json({ message: 'Usuário já existe' });

  const user = await models.User.create({
    displayName,
    email,
    password,
    image,
  });

  return res.status(201).json(user);
});

module.exports = UserRouter;

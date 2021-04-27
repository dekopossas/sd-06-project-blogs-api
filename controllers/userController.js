const { Router } = require('express');
const models = require('../models');
const auth = require('../middlewares/auth');

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

  const tokenResponse = await auth.createToken(user);

  return res.status(201).json(tokenResponse);
});

module.exports = UserRouter;

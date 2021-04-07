const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { validateNewUser } = require('../validations/validateNewUser');
const { validateToken } = require('../validations/validateToken');

const userRouter = Router();

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '7d',
};

userRouter.get('/', validateToken, async (request, response) => {
  const allUser = await User.findAll({});
  return response.status(200).json(allUser);
});

userRouter.post('/', validateNewUser, async (request, response) => {
  const { displayName, email, password, image } = request.body;

  const user = await User.findOne({ where: { email } });
  if (user) return response.status(409).json({ message: 'Usuário já existe' });
  await User.create({ displayName, email, password, image });

  const token = jwt.sign({ data: [displayName, email, password, image] }, 'Chapolin', jwtConfig);
  return response.status(201).json({ token });
});

module.exports = userRouter;

const JWT = require('jsonwebtoken');

const validateEmail = (email) => {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
};
const validateSignUp = (req, res, next) => {
  const { displayName, email, password } = req.body;
  if (displayName.length < 8) return res.status(400).json({ message: '"displayName" length must be at least 8 characters long' });
  if (!email) return res.status(400).json({ message: '"email" is required' });
  if (!validateEmail(email)) return res.status(400).json({ message: '"email" must be a valid email' });
  if (!password) return res.status(400).json({ message: '"password" is required' });
  if (password.length < 6) return res.status(400).json({ message: '"password" length must be 6 characters long' });
  next();
};

const loginValidation = (req, res, next) => {
  const { email, password } = req.body;
  if (email === '') return res.status(400).json({ message: '"email" is not allowed to be empty' });

  if (email === undefined) return res.status(400).json({ message: '"email" is required' });

  if (!validateEmail(email)) return res.status(400).json({ message: '"email" must be a valid email' });

  if (password === '') return res.status(400).json({ message: '"password" is not allowed to be empty' });

  if (password === undefined) return res.status(400).json({ message: '"password" is required' });

  next();
};
const verifyToken = (token) => JWT.verify(token, 'secret');
const validadeToken = async (req, res, next) => {
  if (!req.headers.authorization) return res.status(401).json({ message: 'Token não encontrado' });
  try {
    const user = verifyToken(req.headers.authorization, 'secret');
    req.user = user;
  } catch (err) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
  next();
};

const validatePosts = async (req, res, next) => {
  const { title, content } = req.body;
  if (!title) return res.status(400).json({ message: '"title" is required' });
  if (!content) return res.status(400).json({ message: '"content" is required' });
  next();
};
module.exports = {
  validateSignUp,
  loginValidation,
  validadeToken,
  validatePosts,
};

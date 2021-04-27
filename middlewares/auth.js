const jwt = require('jsonwebtoken');

const SECRET = 'SARTOBOLAS';
const config = { algorithm: 'Hs256', expiresIn: '7d' };

const UNAUTHORIZED = 401;

const createToken = (payload) => jwt.sign(payload.dataValues, SECRET, config);

const verifyToken = (token) => jwt.verify(token, SECRET);

const validateToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(UNAUTHORIZED).json({ message: 'Token não encontrado' });
  }
  try {
    const payload = verifyToken(authorization, SECRET);
    req.payload = payload;
  } catch (error) {
    return res.status(UNAUTHORIZED).json({ message: 'Token expirado ou inválido' });
  }
  return next();
};

module.exports = {
  createToken,
  verifyToken,
  validateToken,
  SECRET,
};

const { BlogPost } = require('../models');

const checkUserValidation = async (req, res, next) => {
  const { id } = req.params;
  const post = await BlogPost.findOne({ where: { id } });
  try {
    const { id: userId } = post.dataValues;
    if (userId === req.payload.id) {
      next();
    } else {
      return res.status(401).json({ message: 'Usuário não autorizado' });
    }
  } catch {
    return res.status(401).json({ message: 'Não foi possível, tente novamente mais tarde' });
  }
};

module.exports = checkUserValidation;

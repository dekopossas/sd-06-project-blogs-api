const { Users } = require('../models');

const checkUserId = async (req, res, next) => {
  const { id } = req.params;
  const checkId = await Users.findOne({
    where: {
      id,
    },
  });
  console.log(checkId);
  if (!checkId) {
    res.status(404).json({ message: 'Usuário não existe' });
  }
  next();
};

module.exports = checkUserId;

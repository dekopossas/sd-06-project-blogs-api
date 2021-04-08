const validateEmail = (email) => {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
};
const validateSignUp = (req, res, next) => {
  const { displayName, email, password } = req.body;
  if (displayName.length < 8) res.status(400).json({ message: '"displayName" length must be at least 8 characters long' });
  if (!email) res.status(400).json({ message: '"email" is required' });
  if (!validateEmail(email)) res.status(400).json({ message: '"email" must be a valid email' });
  if (!password) res.status(400).json({ message: '"password" is required' });
  if (password.length < 6) res.status(400).json({ message: '"password" length must be 6 characters long' });
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

module.exports = {
  validateSignUp,
  loginValidation,
};

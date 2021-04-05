const Joi = require('joi');

const BAD_REQUEST = 400;
const INTERNAL_ERROR = 500;

const schema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email({ tlds: { allow: true } }).required(),
  password: Joi.string().min(6).required(),
});

const FieldsValidation = (req, res, next) => {
  const { displayName, email, password } = req.body;
  const { error } = schema.validate({ displayName, email, password });
  try {
    if (error) {
      return res.status(BAD_REQUEST).json({ message: error.details[0].message });
    }
  } catch (err) {
    res.status(INTERNAL_ERROR).json({ message: err.message });
  }
  next();
};

module.exports = FieldsValidation;

const Joi = require('@hapi/joi');

module.exports = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  timestamps: Joi.any().forbidden(),
});

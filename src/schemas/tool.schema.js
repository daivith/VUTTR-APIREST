const Joi = require('@hapi/joi');

module.exports = Joi.object({
  title: Joi.string().min(3).required(),
  link: Joi.string().required(),
  description: Joi.string().required(),
  tags: Joi.array().min(1),
});

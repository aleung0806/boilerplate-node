const Joi = require('joi');

const getAll = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  password: Joi.string().required()
})

const getById = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
})

const logout = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
})



module.exports = {
  register,
  login,
  logout,
}
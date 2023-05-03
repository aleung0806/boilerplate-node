const Joi = require('joi');

const register = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  password: Joi.string().required()
})

const login = Joi.object({
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
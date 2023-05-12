const Joi = require('joi');

const create = {
  params: Joi.object({
    id: Joi.string()
  }),
  body: Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    password: Joi.string().required()
  })
}

const getAll = {}
const deleteAll = {}

const getById =  {
  params: Joi.object({
    id: Joi.string()
  })
}

const updateById = {
  params: Joi.object({
    id: Joi.string()
  }),
  body: Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    roles: Joi.array().items(Joi.string())
  })
}

const deleteById = {
  params: Joi.object({
    id: Joi.string()
  })
}

module.exports = {
  create,
  getAll,
  deleteAll,
  getById,
  updateById,
  deleteById
}
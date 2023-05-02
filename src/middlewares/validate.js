const Joi = require('joi');
const logger = require('../utils/logger');

const parts = ['params', 'query', 'body']

const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {abortEarly: false})
  if (error) {
    const errorMessage = error.details.map((details => details.message)).join('. ')
    logger.error(`${errorMessage}`)
    return next(new Error(errorMessage))
  }

  return next();
};

module.exports = validate
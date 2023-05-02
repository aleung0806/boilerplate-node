const logger = require('../utils/logger');
const { StatusCodes } = require('http-status-codes')
const ApiError = require('../utils/ApiError')


const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {abortEarly: false})
  if (error) {
    const errorMessage = error.details.map((details => details.message)).join('. ')
    return next(new ApiError(StatusCodes.BAD_REQUEST, errorMessage))
  }

  return next();
};

module.exports = validate
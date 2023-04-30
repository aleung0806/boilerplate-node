const logger = require("../utils/logger");

const requestLogger = (request, response, next) => {
  
  logger.info(JSON.stringify(request.path))
  next();
};

module.exports = requestLogger;

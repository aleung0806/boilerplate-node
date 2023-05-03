const logger = require("../utils/logger");
const morgan = require('morgan')


const requestLogger = (req, res, next) => {
  
  if (req.session){
    logger.info(`session: ${JSON.stringify(req.session.user)}`)
  }
  next();
};

module.exports = requestLogger;





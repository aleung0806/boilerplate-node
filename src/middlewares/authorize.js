const logger = require("../utils/logger")
const userService = require('../services/user.service')
const ApiError = require('../utils/ApiError')
const { StatusCodes } = require('http-status-codes')

const authorize = (roles) => async (req, res, next) => {
  const id = req.session.user.id
  const user = await userService.getById(id)

  // check for role match ['admin', 'user', 'owner', etc]
  for (const role of roles){
    if(user.roles.includes(role)){
      return next();
    }
  }

  // check for action match ['self', 'project', etc]
  if (roles.includes('self')){
    if (user.id === req.params.id){
      logger.debug('user is self')
      return next();
    }
  }
  
  return next(new ApiError(StatusCodes.FORBIDDEN, 'You do not have permission.'));

}

module.exports = authorize
const User = require('../models/user.model');
const logger = require('../utils/logger');
const { StatusCodes } = require('http-status-codes')
const ApiError = require('../utils/ApiError')

const create = async (user) => {
  if (await User.emailExists(user.email)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Email is already taken.')
  }
  return User.create(user)
}

const getByEmail = async (email) => {
  return User.findOne({email})
}



// const get = async (id) => {
//   const user = await repo.get(id);
//   return _.pick(user, ["id", "firstName", "lastName", "email"]);
// };

// const getByProject = async (projectId) => {
//   const users = await repo.get(projectId);
//   return users.map((user) =>
//     _.pick(user, ["id", "firstName", "lastName", "email"])
//   );
// };

// const update = async (id, element) => {
//   const user = await repo.update(id, element);
//   return _.pick(user, ["id", "firstName", "lastName", "email"]);
// };

// const remove = async (id) => {
//   return await repo.remove(id);
// };

module.exports = {
  create,
  getByEmail
  // get,
  // getByProject,
  // update,
  // remove,
};

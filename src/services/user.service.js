const repo = require("../models/user");
const _ = require("lodash");
const { User } = require('../models/user.model');

const create = async (user) => {
  return User.create(user);
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
  create
  // get,
  // getByProject,
  // update,
  // remove,
};

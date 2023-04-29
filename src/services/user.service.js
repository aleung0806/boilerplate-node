const repo = require('../models/user')
const _ = require('lodash')
const user = require('../models/user')

const get = async (id) => {
  const user = await repo.get(id)
  return _.pick(user, ['id', 'firstName', 'lastName', 'email'])
}

const getByProject = async (projectId) => {
  const users = await repo.get(projectId)
  return users.map(user => _.pick(user, ['id', 'firstName', 'lastName', 'email']))
}

const update = async (id, element) => {
    const user = await repo.update(id, element)
    return _.pick(user, ['id', 'firstName', 'lastName', 'email'])
}

const remove = async (id) => {
    return await repo.remove(id)
}

module.exports = {
  get,
  getByProject,
  update,
  remove
}
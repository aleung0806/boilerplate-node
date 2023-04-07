const repo = require('../repository/list')
 

const create = async (element) => {
  const createdList = await repo.create(element)
  return {...createdList, issues: []}
}

const update = async (id, element) => {
    return await repo.update(id, element)
}

const remove = async (id) => {
    return await repo.remove(id)
}

module.exports = {
  create,
  update,
  remove
}
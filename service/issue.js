const repo = require('../repository/issue')
const list = require('../repository/list')
const listRepo = require('../repository/list')

 

const create = async (element) => {
  const issue = await repo.create(element)
  const list = await listRepo.addIssue(issue)
  console.log(JSON.stringify(list, null, 2))
  return issue
}

const get = async (id) => {
  return await repo.get(id)
}

const update = async (id, element) => {
    return await repo.update(id, element)
}

const remove = async (id) => {
  const issue = await repo.get(id)
  await repo.remove(id)
  const list = await listRepo.removeIssue(issue)
  console.log(JSON.stringify(list, null, 2))
  return issue
}

module.exports = {
  create,
  get,
  update,
  remove
}
const { default: knex } = require('knex')
const genericRepo = require('./generic')
const db = require('../db/db')


const listRepo = () => {

  let repo = genericRepo('list')

  repo.addIssue = async (issue) => {
    console.log(JSON.stringify(issue, null, 2))
    const issueId = issue.id
    const listId = issue.listId


    const updatedList = await db('list')
      .update({
      issue_order: db.raw('array_append(issue_order, ?)', [issueId])
      })
      .where('id', listId)
      .returning('*')

    return updatedList[0]
  }
  
  repo.removeIssue = async (issue) => {
    console.log(JSON.stringify(issue, null, 2))
    const issueId = issue.id
    const listId = issue.listId

    const updatedList = await db('list')
      .update({
      issue_order: db.raw('array_remove(issue_order, ?)', [issueId])
      })
      .where('id', listId)
      .returning('*')

    return updatedList[0]
  }

  repo.getByProject = async (projectId) => {
    const lists = await db
      .select('*')
      .from('list')
      .where('projectId', projectId)
      .orderBy('id')
    return lists
  }
  return repo
}

module.exports = listRepo()
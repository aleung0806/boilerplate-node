const genericRepo = require('./generic')
const db = require('../db/db')

const issueRepo = () => {

  let repo = genericRepo('issue')

  repo.getByProject = async (projectId) => {
    const issues = await db
    .select(
      '*'
    )
    .from('issue')
    .where('projectId', projectId)

    // console.log('here', issues)
    return issues

  }

  return repo

}

module.exports = issueRepo()
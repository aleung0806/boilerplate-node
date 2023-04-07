const genericRepo = require('./generic')
const db = require('../db/db')
const makeNested = require('./makeNested')

const projectRepo = () => {
  let repo = genericRepo('project')

  repo.getByUser = async (id) => {
    // console.log(`project repo getByUser ${id}`)
    const records = await db
      .select(
        'role.role as role',
        'role.projectId as id',
        'project.title as title'
      )
      .from('role')
      .leftJoin('project', 'role.projectId', 'project.id')
      .where('role.userId', id)
      .orderBy('id')


    if (records.length > 0){

      return records
    }else{
      throw new Error('not found')
    }
  }

  return repo

}




module.exports = projectRepo()



//repo.get = async (projectId) => {
//   const project = await db
//     .select(
//       'project.id as projectId', 
//       'project.title as projectTitle',
//       'list.id as listId', 
//       'list.title as listTitle', 
//       'list.issueOrder as issueOrder',
//     )
//     .from('project')
//     .leftJoin('list', 'project.id', 'list.projectId')
//     .where('project.id', projectId)
//     .orderBy('list.issueId')

//   if (project.length === 0){
//     return new Error('not found in db')
//   }

//   const issues = await db
//   .select(
//     'issue.*'
//   )
//   .from('issues')
//   .where('issue.id', projectId)



//   return makeNested.projectGet(project, issues)

// }
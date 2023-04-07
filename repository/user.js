const genericRepo = require('./generic')
const db = require('../db/db')
const { getUser } = require('./makeNested')

const repo = () => {

  let repo = genericRepo('user')

  repo.getByEmail = async (email) => {
      console.log(`user repo getByEmail ${email}`)
  
      const records = await db
        .select('*')
        .from('user')
        .where('email', email)
  
        if (records.length > 0){
          return records[0]
        }else{
          throw new Error('not found')
        }
  }

  repo.getByProject = async (projectId) => {

    const records = await db
    .select(
      'role.id as roleId',
      'role.role as role',
      'user.*'
            )
    .from('project')
    .where('projectId', projectId)
    .leftJoin('role', 'project.id', 'role.projectId')
    .leftJoin('user', 'role.userId', 'user.id')

    if (records.length > 0){
      return records
    }else{
      throw new Error('not found')
    }
  }

  // repo.get = async (id) => {
  //   console.log(`user repo get ${id}`)

  //     const records = await db
  //       .select(
  //         'role.role as role',
  //         'role.projectId as projectId',
  //         'project.title as projectTitle'
  //       )
  //       .from('role')
  //       .leftJoin('project', 'role.projectId', 'project.id')
  //       .where('role.userId', id)

  //     if (records.length > 0){

  //       return records[0]
  //     }else{
  //       throw new Error('not found')
  //     }
  // }

  return repo

}

module.exports = repo()
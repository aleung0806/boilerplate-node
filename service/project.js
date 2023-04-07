const projectRepo = require('../repository/project')
const listRepo = require('../repository/list')
const issueRepo = require('../repository/issue')
const userRepo = require('../repository/user')

const roleRepo = require('../repository/role')
 
const create = async (element) => {
  const {userId, ...project} = element

  const createdProject = await projectRepo.create(project)
  await roleRepo.create({projectId: createdProject.id, userId, role: 'admin'})

  return {...createdProject, lists: []}
}

const get = async (id) => {
  let project = await projectRepo.get(id)
  let users = await userRepo.getByProject(id)
  let lists = await listRepo.getByProject(id)
  let issues = await issueRepo.getByProject(id)

  project.users = users
  project.lists = []
  for(let i = 0; i < lists.length; i++){
    let list = lists[i]
    list.issues = []
    if (list.issueOrder !== null){
      for (let j = 0; j < list.issueOrder.length; j++){
        let issue = issues.find(issue => issue.id === list.issueOrder[j])
        list.issues.push(issue)
      }
    }
    project.lists.push(list)
  }

  // console.log(project)
  return project
}

const getByUser = async (userId) => {
  return await projectRepo.getByUser(userId)
}

const update = async (id, element) => {
    return await projectRepo.update(id, element)
}

const remove = async (id) => {
    return await projectRepo.remove(id)
}

module.exports = {
  create,
  get,
  getByUser,
  update,
  remove
}
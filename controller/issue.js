const issueService  = require('../service/issue')
const permissionService = require('../service/permissions')

const create = async (req, res, next) => {
  const element = req.body
  const projectId = element.projectId
  const userId = req.session.user.id
  
  if (!(projectId && element.title)) {
    return res.status(400).send('more info needed')
  }

  const permitted = await permissionService.isMember(userId, projectId, 'project')
  if (!permitted){
    return res.status(401).send('permission denied')
  }

  try{
    const createdElement = await issueService.create({creatorId: userId, ...element})
    res.status(200).json(createdElement)
  }catch(err){
    next(err)
  }
}

const get = async (req, res, next) => {
  const id = req.params.id
  const userId = req.session.user.id

  const permitted = await permissionService.isMember(userId, id, 'issue')
  if (!permitted){
    return res.status(401).send('permission denied')
  }

  try{
    const element = await issueService.get(id)
    res.status(200).json(element)
  }catch(err){
    next(err)
  }
}


const update = async (req, res, next) => {
  const id = req.params.id
  const element = req.body
  const userId = req.session.user.id

  const permitted = await permissionService.isMember(userId, id, 'issue')
  if (!permitted){
    return res.status(401).send('permission denied')
  }

  try{
    const updatedElement = await issueService.update(id, element)
    res.status(200).json(updatedElement)
  }catch(err){
    next(err)
  }
}

const remove = async (req, res, next) => {
  const id = req.params.id
  const userId = req.session.user.id

  const permitted = await permissionService.isAdmin(userId, id, 'issue')
  if (!permitted){
    return res.status(401).send('permission denied')
  }

  try{
    await issueService.remove(id)
    res.sendStatus(200)
  }catch(err){
    console.log("error", err)
    next(err)
  }
}


module.exports = {
  create,
  get,
  update,
  remove
}
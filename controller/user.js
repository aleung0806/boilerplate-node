const service  = require('../service/user')

const get = async (req, res, next) => {
  const user = req.session.user
  const id = user.id
  console.log(`request for ${id}`)

  try{
    const element = await service.get(id, req.session.id)
    res.status(200).json(element)
  }catch(err){
    next(err)
  }
}

const getByProject = async (req, res, next) => {
  const userId = req.session.user.id
  console.log(`request for ${projectId}`)

  const permitted = await permissionService.isMember(userId, projectId, 'project')
  if (!permitted){
    return res.status(401).send('permission denied')
  }

  try{
    const element = await service.getByProject(projectId)
    res.status(200).json(element)
  }catch(err){
    next(err)
  }
}

const update = async (req, res, next) => {
  const id = req.params.id
  const element = req.body
  const sessionId = req.session.user.id
  console.log(`element update ${id} ${sessionId} with ${JSON.stringify(element)}`)

  if (sessionId != id){
    res.status(401).send('permission denied')
    return 
  }

  if (element.id || element.email){
    res.status(400).send('cannot change userId or email')
  }

  try{
    const updatedElement = await service.update(id, element)
    res.status(200).json(updatedElement)
  }catch(err){
    next(err)
  }
}

const remove = async (req, res, next) => {
  const id = req.params.id
  const { userId, email }= req.session
  console.log(`element remove ${id} by ${email} (id ${userId})`)

  if (req.session.user.id != id){
    res.status(401).send('permission denied')
    return 
  }

  try{
    await service.remove(id)
    req.session.destroy(err => next(err))
    res.status(200).send('user deleted')
  }catch(err){
    next(err)
  }


}

module.exports =  {
  get,
  getByProject,
  update,
  remove
}
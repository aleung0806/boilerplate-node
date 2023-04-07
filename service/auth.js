const bcrypt = require('bcrypt')
const userRepo = require('../repository/user')
const projectRepo = require('../repository/project')

const _ = require('lodash')
const saltRounds = 10


const register = async (firstName, lastName, email, password) => {
  let passwordHash = await bcrypt.hash(password, saltRounds)
  let user = await userRepo.create( { firstName, lastName, email, passwordHash } )
  delete user.passwordHash

  return user
}

const login = async (email, password) => {
  const user = await userRepo.getByEmail(email)
  const match = await bcrypt.compare(password, user.passwordHash)  


  if (match) {
    const projects = await projectRepo.getByUser(user.id)
    return {...user, projects}
  }else{
    throw new Error('credentials did not match')
  }
}



module.exports = { register, login }
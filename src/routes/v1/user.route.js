const express = require('express')
const userController = require('../controllers/user.controller')
const userRouter = express.Router()

userRouter.get('/', userController.get)
userRouter.get('/projectId/:id', userController.getByProject)
userRouter.put('/:id', userController.update)
userRouter.delete('/:id', userController.remove)


module.exports = userRouter
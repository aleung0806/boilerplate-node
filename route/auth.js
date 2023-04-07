const express = require('express')
const { register, login, logout, verify } = require('../controller/auth')

const authRouter = express.Router()

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.post('/logout', logout)
authRouter.post('/verify', verify)


module.exports = authRouter
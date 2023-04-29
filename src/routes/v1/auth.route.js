const express = require('express')
const { register, login, logout, verify } = require('../controllers/auth.controller')

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.post('/verify', verify)


module.exports = authRouter
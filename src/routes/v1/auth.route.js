const express = require('express')
const authController = require('../../controllers/auth.controller')
const authSchema = require('../../middlewares/validationSchemas/auth.schema')
const validate = require('../../middlewares/validate')

const router = express.Router()

router.post('/register', validate(authSchema.register), authController.register)
router.post('/login', validate(authSchema.login), authController.login)

// router.post('/logout', logout)
// router.get('/verify', verify)


module.exports = router
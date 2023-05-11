const express = require("express");
const userController = require("../../controllers/user.controller");
const router = express.Router();
const authorize = require('../../middlewares/authorize')

router.route('/users')
  .get(authorize(['admin']), userController.getAll)
  .post(authorize(['admin']), userController.create)
  .delete(authorize(['admin']), userController.deleteAll)

router.route("/users/:id")
  .get(authorize(['admin', 'self']), userController.getById)
  .put(authorize(['admin','self']), userController.updateById)
  .delete(authorize(['admin', 'self']), userController.deleteById)

module.exports = router;

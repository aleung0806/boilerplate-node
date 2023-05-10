const express = require("express");
const userController = require("../../controllers/user.controller");
const router = express.Router();

router.route('/users')
  .get(userController.getAll)
  .post(userController.create)
  .delete(userController.deleteAll)

router.route("/users/:id")
  .get(userController.getById)
  .patch(userController.updateById)
  .delete(userController.deleteById)

module.exports = router;

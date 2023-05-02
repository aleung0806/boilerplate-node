// const authService = require("../services/auth.service");
const userService = require("../services/user.service");
const authService = require("../services/auth.service");

const { StatusCodes } = require('http-status-codes')
const logger = require('../utils/logger')

const register = async (req, res, next) => {
  const user = await userService.create(req.body)

  res.status(StatusCodes.CREATED).send({user})
};

const login = async (req, res, next) => {
  const { email, password } = req.body
  const user = await authService.login(email, password)
  res.status(StatusCodes.OK).send({user})
};

// const login = async (req, res, next) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).send("fields are missing");
//   }

//   try {
//     const user = await service.login(email, password);

//     req.session.regenerate((err) => next(err));
//     req.session.user = user;
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(400).send("incorrect email or password");
//   }
// };

// const logout = async (req, res, next) => {
//   req.session.destroy((err) => next(err));
//   res.send("you are now logged out");
// };

// const verify = async (req, res, next) => {
//   console.log(req.session);
//   const user = req.session.user;
//   if (user !== null) {
//     console.log(user);
//     res.send(user);
//   } else {
//     res.send("not logged in");
//   }
// };

const verify = async (req, res, next) => {
  logger.warn('verify controller')
};

module.exports = {
  register,
  login,
  // logout,
  verify,
};

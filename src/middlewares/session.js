const expressSession = require("express-session");
const config = require('../config/config')
const { redisStore } = require('../db/redis')
const logger = require("../utils/logger");

const session = expressSession({
  store: redisStore,
  secret: config.session.secret,
  saveUninitialized: false,
  resave: false,
  cookie: {
    secure: false,
    sameSite: "lax",
  },
});

const log = (req, res, next) => {
  if (req.session){
    logger.info(`session: ${JSON.stringify(req.session.user)}`)
  }
  next();
};



module.exports = [session, log]

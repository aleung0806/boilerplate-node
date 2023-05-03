const session = require("express-session");
const config = require('../config/config')
const { redisStore } = require('../db/redis')


module.exports = session({
    store: redisStore,
    secret: config.session.secret,
    saveUninitialized: false,
    resave: false,
    name: "sessionId",
    cookie: {
      secure: false,
      sameSite: "lax",
    },
  });

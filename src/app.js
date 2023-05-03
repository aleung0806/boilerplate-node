const express = require("express");
const helmet = require("helmet");
const logger = require("./utils/logger")
const requestLogger = require('./middlewares/requestLogger')
const errorHandler = require('./middlewares/error')
require('express-async-errors');
const morgan = require('./middlewares/morgan')
const session = require('./middlewares/session')
const passport = require('./middlewares/passport')

// const requestLogger = require("./utils/middleware/requestLogger");
// const unknownEndpoint = require("./utils/middleware/unknownEndpoint");
// const errorHandler = require("./utils/middleware/errorHandler");
// const authenticate = require("./utils/middleware/authenticate");
const authRouter = require("./routes/v1/auth.route");
const testRouter = require("./routes/v1/test.route");
const userRouter = require('./routes/v1/user.route')

// const userRouter = require("./src/routes/user.route");



const app = express();
app.use(helmet());
app.use(express.json());
app.use(morgan)

app.use(passport.initialize());
app.use(passport.session())

app.use(requestLogger);
app.use('/v1', authRouter);
app.use('/v1', userRouter);
app.use('/v1', testRouter);

app.use(errorHandler)


module.exports = app;

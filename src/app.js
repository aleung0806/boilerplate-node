const express = require("express");
const helmet = require("helmet");

const routes = require('./routes/v1');

// const redis = require("redis");

// const requestLogger = require("./utils/middleware/requestLogger");
// const unknownEndpoint = require("./utils/middleware/unknownEndpoint");
// const errorHandler = require("./utils/middleware/errorHandler");
// const authenticate = require("./utils/middleware/authenticate");

// const authRouter = require("./src/routes/auth.route");
// const userRouter = require("./src/routes/user.route");

// const session = require("express-session");
// const redisStore = require("connect-redis")(session);

// const redisClient = redis.createClient({
//   host: "localhost",
//   port: 6379,
//   legacyMode: true,
// });

// redisClient
//   .connect()
//   .then(() => {
//     console.log("connected to redis");
//   })
//   .catch(() => {
//     console.log("not connected to redis");
//   });

// const store = new redisStore({ client: redisClient });

const app = express();

app.use(helmet());
app.use(express.json());

app.use('/v1', routes);

// app.use(
//   session({
//     store: store,
//     secret: "mySecret",
//     saveUninitialized: false,
//     resave: false,
//     name: "sessionId",
//     cookie: {
//       secure: false,
//       httpOnly: false,
//       maxAge: 1000 * 60 * 60,
//       sameSite: "lax",
//     },
//   })
// );

// app.use(requestLogger);
// app.use("/auth", authRouter);
// app.use(authenticate);
// app.use("/user", userRouter);
// app.use(errorHandler);
// app.use(unknownEndpoint);

module.exports = app;

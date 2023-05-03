const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT, 
  mongoose: {
    url: process.env.MONGODB_URL
  },
  jwt: {
    secret: process.env.JWT_SECRET
  },
  redis: {
    url: process.env.REDIS_URL
  },
  session: {
    secret: process.env.SESSION_SECRET
  },
  email: {
    username: process.env.SMTP_USERNAME,
    password: process.env.SMTP_PASSWORD
  }

}
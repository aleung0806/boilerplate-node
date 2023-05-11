const authPath = require('./paths/auth.doc')
const usersPath = require('./paths/users.doc')
const components = require('./components.doc')

module.exports = {
  openapi: "3.0.0",
  info: {
    title: "node-boilerplate",
    description: "api documentation",
    version: "1.0.0"
  },
  servers: [
    {
      url: "http://localhost:3000/v1",
      description: "test server"
    }
  ],
  tags: [
    {
      name: "auth",
      description: "authentication"
    },
    {
      name: "users",
      description: "manage users"
    }
  ],
  components: components,
  paths: {
    ...authPath,
    ...usersPath
  },

}
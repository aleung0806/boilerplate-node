const register = {
  summary: "register new user",
  tags: [ "auth" ],
  requestBody: {
    required: true,
    content: { 'application/json': {
      schema: {
        type: "object",
        required: [ "email", "password", "username" ],
        properties: {
          email: { type: "string" },
          password: { type: "string" },
          username: { type: "string" }
        }
      }
    }}
  },
  responses: {
    201: {
      description: "Created",
      content: { 'application/json': {
          schema: { $ref: "#/components/schemas/User" }
      }}
    },
    400:{ 
      schema: { $ref: "#/components/schemas/User" }
    }
  }
}

const login = {
  summary: "log in user",
  tags: [ "auth" ],
  requestBody: {
    required: true,
    content: { 'application/json': {
        schema: {
          type: "object",
          required: [ "email", "password" ],
          properties: {
            email: { type: "string" },
            password: { type: "string" }
          }
        }
    }}
  },
  responses: {
    200: {
      description: "Logged In",
      content: { 'application/json': {
          schema: { $ref: "#/components/schemas/User" }
        }
      }}
  }
}

module.exports = {
  '/auth/register': {
    post: register
  },
  '/auth/login': {
    post: login
  },
}
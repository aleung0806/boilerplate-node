const post = {
  summary: "add a new user",
  tags: [ "users" ],
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
    }
  }
}

const get = {
  summary: "get all users",
  tags: [
    "users"
  ],
  responses: {
    200: {
      description: "OK",
      content: { 'application/json': {
          type: "array",
          items: { $ref: "#/components/schemas/User"}
        }
      }}
  }
  }

const deleteUser = {
  summary: "delete all users",
  tags: [ "users" ],
  responses: {
    204: {
      description: "No content"
    }
  }
}

const idGet = {
  summary: "get user by id",
  tags: [
    "users"
  ],
  responses: {
    200: {
      description: "OK",
      content: { 'application/json': {
        schema: { $ref: "#/components/schemas/User" }
    }}
    }
  }
}

const idPut =  {
  summary: "update user by id",
  tags: [
    "users"
  ],
  responses: {
    200: {
      description: "OK",
      content: { 'application/json': {
        schema: { $ref: "#/components/schemas/User" }
    }}
    }
  }
}
const idDelete = {
  summary: "delete user by id",
  tags: [
    "users"
  ],
  responses: {
    204: {
      description: "No content"
    }
  }
}

module.exports = {
  users: {
    post: post,
    get: get,
    delete: deleteUser
  },
  '/users/{id}': {
    get: idGet,
    put: idPut,
    delete: idDelete
  }
}

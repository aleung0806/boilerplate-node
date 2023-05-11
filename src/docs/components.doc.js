const schemas = {
  User: {
    type: "object",
    properties: {
      id: { type: "string" },
      email: { type: "string" },
      username: { type: "string" }
    }
  },
  Error: {
    type: "object",
    properties: {
      code: { type: "number" },
      message: { type: "string" }
    }
  }
}
const responses = {
  TakenEmail: {
    description: "Email is already taken",
    content: { 'application/json': {
        schema: { $ref: "#/components/schemas/Error"}
    }}
  },
  Unauthorized: {
    description: "Unauthorized",
    content: { 'application/json': {
      schema: { $ref: "#/components/schemas/Error" }
    }}
  },
  Forbidden: {
    description: "Forbidden",
    content: { 'application/json': {
      schema: { $ref: "#/components/schemas/Error" }
    }}
  },
  NotFound: {
    description: "NotFound",
    content: { 'application/json': {
      schema: { $ref: "#/components/schemas/Error" }
    }}
  }
}

module.exports = {
  schemas,
  responses
}
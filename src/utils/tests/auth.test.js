const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../../app");
const api = supertest(app);
const User = require('../../models/user.model')
const config = require('../../config/config')


beforeAll(async () => {
  await mongoose.connect(config.mongoose.url)
  await User.deleteMany({})
})

describe('/v1/register', () => {
  test('valid register is accepted', async () => {
    const res = await api
      .post('/v1/register')
      .send({
        email: 'test@test.com',
        username: 'testuser',
        password: 'password'
      })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(res.body.user).toEqual({
      id: expect.anything(),
      email: 'test@test.com',
      username: 'testUser',
    })
    expect(res.body.user).not.toHaveProperty('password')

    

    //response body
    //each field must be the same as submitted
    //password must not be returned
    //must include new id field

    //db
    //password must be saved as a hash
    //must have the required fields

    //tokens

    res
      .expect(201)
      .expect('Content-Type', /application\/json/)

  })
})


afterAll(async () => {
  await mongoose.connection.close()
})

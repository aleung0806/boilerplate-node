const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../../app");
const api = supertest(app);
const User = require('../../models/user.model')
const config = require('../../config/config')
const { redisClient } = require('../../db/redis')

const user1 = {
  email: 'user1@test.com',
  username: 'user1',
  password: 'password'
}

const user2 = {
  email: 'user2@test.com',
  username: 'user2',
  password: 'wordpass'
}

beforeAll(async () => {
  await mongoose.connect(config.mongoose.url)
  await User.deleteMany({})
})

describe('/v1/register', () => {
  test('should register new user correctly if valid request', async () => {
    const res = await api
      .post('/v1/register')
      .send(user1)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    expect(res.body.user).toEqual({
      id: expect.anything(),
      email: user1.email,
      username: user1.username
    })
    expect(res.body.user).not.toHaveProperty('password')

    const dbUser = await User.findOne({email: user1.email})
    expect(dbUser).toEqual(
      expect.objectContaining({
        id: expect.anything(),
        email: user1.email,
        username: user1.username,
        password: expect.not.stringMatching(user1.password)
      })
    )
  })

  test('should return 400 if email is taken', async () => {
    const res = await api
      .post('/v1/register')
      .send({
        email: user1.email,
        username: user2.username,
        password: user2.password
      })
      .expect(400)

    expect(res.body.user).toBeUndefined()
  })

  test('should return 400 if username is not included', async () => {
    const res = await api
      .post('/v1/register')
      .send({
        email: user2.email,
        password: user2.password
      })
      .expect(400)

    expect(res.body.user).toBeUndefined()
  })
})

describe('/v1/login', () => {
  test('should return 200 and session cookie if login is valid', async () => {
    const res = await api
      .post('/v1/login')
      .send({
        email: user1.email,
        password: user1.password
      })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(res.body.user).toEqual({
      id: expect.anything(),
      email: user1.email,
      username: user1.username
    })
    expect(res.header['set-cookie'][0]).toMatch(/^sessionId=/)
  })


  test('should return 401 if password does not match email', async () => {
    const res = await api
      .post('/v1/login')
      .send({
        email: user1.email,
        password: user2.password
      })
      .expect(401)

      expect(res.body.user).toBeUndefined()

  })

  test('should return 401 if email does not exist', async () => {
    const res = await api
      .post('/v1/login')
      .send({
        email: user2.email,
        password: user2.password
      })
      .expect(401)
      
      expect(res.body.user).toBeUndefined()
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})

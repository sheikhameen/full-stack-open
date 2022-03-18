const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({username: "superman", name: "Superman", passwordHash})
  await user.save()
})

describe('invalid user', () => {
  test('with missing username or password is not created', async () => {
    let invalidUser = {
      name: "Username Misser",
      password: "usernamemisserpassword"
    }
    await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)

    invalidUser = {
      username: "passwordmisser",
      name: "Password Misser"
    }
    await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)

  })
  test('with username or password shorter than 3 characters is not created ', async () => {
    let invalidUser = {
      username: "no",
      password: "strongpassword"
    }
    await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)

    invalidUser = {
      username: "strongusername",
      password: "no"
    }
    await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)


  })
  test('with an existing username is not created', async () => {
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = {username: "superman", name: "Superman", passwordHash}

    await api
      .post('/api/users')
      .send(user)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
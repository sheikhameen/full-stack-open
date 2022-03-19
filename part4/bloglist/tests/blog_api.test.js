const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

let token = null

beforeEach(async () => {
  // // Reset users
  await User.deleteMany({})
  const myUser = { username: 'root', name: 'Super User', password: 'sekret' }
  const passwordHash = await bcrypt.hash(myUser.password, 10)
  const user = new User({ username: myUser.username, name: myUser.name, passwordHash })
  await user.save()

  // Login user; get token
  const response = await api
    .post('/api/login')
    .send(myUser)
    .expect(200)

  token = response.body.token

  // Reset blogs
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs.map(blog => new Blog({ ...blog, user: user._id }))
  const promisesArray = blogObjects.map(blog => blog.save())
  await Promise.all(promisesArray)
})

describe('when there are initialy some blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('blogs\' unique identifier property is named id', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body[0].id).toBeDefined()
  })
})

describe('creation of a blog', () => {
  test('succeeds with status 201 if data valid', async () => {
    const newBlog = {
      title: 'New blog test',
      author: 'Me',
      url: 'www.newblog.com',
      likes: 17
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).toContain(
      newBlog.title
    )
  })

  test('fails with status 400 if title and/or url missing', async () => {
    let newBlog = {
      author: 'bad boi',
      url: 'www.titlemissing.com'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)

    let blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    newBlog = {
      title: 'The url missed blog',
      author: 'bad boi'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)

    blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

  })

  test('fails with status 401 if a token is not provided', async () => {
    const newBlog = {
      title: 'New blog test',
      author: 'Me',
      url: 'www.newblog.com',
      likes: 17
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).not.toContain(
      newBlog.title
    )
  })

  test('with a missing likes property defaults likes to 0', async () => {
    const newBlog = {
      title: 'Testing likes default to 0',
      author: 'liketester',
      url: 'www.likestest.com'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)

    const blogs = await helper.blogsInDb()
    expect(blogs[blogs.length - 1].likes).toBe(0)
  })
})

describe('a single blog', () => {
  test('deletion succeeds with status 204', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', 'bearer ' + token)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map(blog => blog.title)

    expect(titles).not.toContain(blogToDelete.title)

  })

  test('can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = {
      ...blogToUpdate,
      likes: 100
    }

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toEqual(JSON.parse(JSON.stringify(updatedBlog)))
  })
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
    const user = { username: "superman", name: "Superman", passwordHash }

    await api
      .post('/api/users')
      .send(user)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promisesArray = blogObjects.map(blog => blog.save())
  await Promise.all(promisesArray)
})

test('blogs are returned in json', async () => {
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

test('a blog post can be created', async () => {
  const newBlog = {
    title: 'New blog test',
    author: 'Me',
    url: 'www.newblog.com',
    likes: 17
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(blog => blog.title)
  expect(titles).toContain(
    newBlog.title
  )
})

test('blog with a missing likes property defaults likes to 0', async () => {
  const newBlog = {
    title: 'Testing likes default to 0',
    author: 'liketester',
    url: 'www.likestest.com'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const blogs = await helper.blogsInDb()
  expect(blogs[blogs.length - 1].likes).toBe(0)
})

test('blog without title and/or url properties are rejected', async () => {
  let newBlog = {
    author: 'bad boi',
    url: 'www.titlemissing.com'
  }

  await api
    .post('/api/blogs')
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
    .send(newBlog)
    .expect(400)

  blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

})

test('deletion of blog succeeds with status 204', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)
  
  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

  const titles = blogsAtEnd.map(blog => blog.title)

  expect(titles).not.toContain(blogToDelete.title)

})

test('a blog can be updated', async () => {
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

  expect(response.body).toEqual(updatedBlog)
})

afterAll(() => {
  mongoose.connection.close()
})
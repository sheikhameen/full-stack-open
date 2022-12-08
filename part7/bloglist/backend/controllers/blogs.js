const blogsRouter = require('express').Router()
const middleware = require('../utils/middleware')
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})


blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  if (!body.title || !body.url) {
    return response.status(400).end()
  }

  const blog = new Blog(
    {
      url: body.url,
      title: body.title,
      author: body.author,
      user: user._id,
      likes: body.likes ? body.likes : 0
    }
  )

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  const userPopulatedBlog = await savedBlog.populate('user', { username: 1, name: 1 })

  response.status(201).json(userPopulatedBlog)

})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const user = request.user

  if (blog && (user._id.toString() === blog.user.toString())) {
    await Blog.findByIdAndRemove(blog.id)
    return response.status(204).end()
  }
  return response.status(401).json({
    error: 'unauthorized user '
  })
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  const userPopulatedBlog = await updatedBlog.populate('user', { username: 1, name: 1 })
  response.json(userPopulatedBlog)
})

module.exports = blogsRouter
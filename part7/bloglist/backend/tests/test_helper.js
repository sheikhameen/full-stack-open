const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'The test of the century',
    author: 'Alpha Tester',
    url: 'www.testofthecentury.com',
    likes: 10
  },
  {
    title: 'I test stuff',
    author: 'Beta Tester',
    url: 'www.iteststuff.com',
    likes: 0
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}
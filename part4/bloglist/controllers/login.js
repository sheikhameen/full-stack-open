const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })
  const passwordCorrect = user === null
  ? false
  : await bcrypt.compare(password, user.passwordHash)

  if (!passwordCorrect) {
    return response.status(400).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    userId: user._id
  }

  const token = jwt.sign(userForToken, process.env.SECRET)
  
  response
    .status(200)
    .json({token, username: user.username, name: user.name})
})

module.exports = loginRouter
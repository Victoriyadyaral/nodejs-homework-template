const gravatar = require('gravatar')
const fs = require('fs/promises')
const path = require('path')
const { Conflict } = require('http-errors')

const { User } = require('../../models')

const avatarsDir = path.join(__dirname, '../../public/avatars')

const register = async(req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('Email in use')
  }
  const avatarURL = gravatar.url(email)
  const newUser = new User({ email, avatarURL })

  newUser.setPassword(password)
  const avatarsFolder = path.join(avatarsDir, String(newUser._id))
  await fs.mkdir(avatarsFolder)
  await newUser.save()
  const { subscription } = newUser

  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Register success',
    user: {
      email,
      subscription
    }
  })
}

module.exports = register

const gravatar = require('gravatar')
const fs = require('fs/promises')
const path = require('path')
const { nanoid } = require('nanoid')
const { Conflict } = require('http-errors')

const { User } = require('../../models')
const { sendMail } = require('../../helpers')

const avatarsDir = path.join(__dirname, '../../public/avatars')

const register = async(req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('Email in use')
  }
  const verificationToken = nanoid()
  const avatarURL = gravatar.url(email)
  const newUser = new User({ email, avatarURL, verificationToken })

  newUser.setPassword(password)
  const avatarsFolder = path.join(avatarsDir, String(newUser._id))
  await fs.mkdir(avatarsFolder)
  await newUser.save()
  const { subscription } = newUser

  const mail = {
    to: email,
    subject: 'Confirm registration',
    html: `<a href="http://localhost:3000/api/auth/verify/${verificationToken}">Click to confirm your email</a>`
  }

  await sendMail(mail)

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

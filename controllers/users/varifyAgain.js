const { BadRequest } = require('http-errors')

const { User } = require('../../models')
const { sendMail } = require('../../helpers')

const verifyAgain = async(req, res) => {
  if (!req.body.email) {
    throw new BadRequest('Missing required field email')
  }

  const { email } = req.body
  const user = await User.findOne({ email })

  if (user.verify) {
    throw new BadRequest('Verification has already been passed')
  }

  const mail = {
    to: email,
    subject: 'Confirm registration',
    html: `<a href="http://localhost:3000/api/auth/verify/${user.verificationToken}">Click to confirm your email</a>`
  }

  await sendMail(mail)
  res.json({
    message: 'Verification email sent'
  })
}

module.exports = verifyAgain

const { NotFound } = require('http-errors')
const { User } = require('../../models')

const updateSubscription = async (req, res) => {
  const { _id } = req.user
  const { subscription } = req.body
  if (!req.body.subscription) {
    return res.status(400).json({ status: 400, message: 'Missing field subscription' })
  }
  const result = await User.findByIdAndUpdate(_id, { subscription }, { new: 'starter' || 'pro' || 'business' })
  if (!result) {
    throw new NotFound('User not found')
  }
  res.json({
    status: 'Success',
    code: 200,
    data: {
      result
    }
  })
}

module.exports = updateSubscription

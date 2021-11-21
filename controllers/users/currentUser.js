const current = async (req, res) => {
  return res.json({
    status: 'success',
    code: 200,
    data: {
      email: req.user.email,
      subscription: req.user.subscription,
    },
  })
}

module.exports = current

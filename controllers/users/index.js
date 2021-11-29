const register = require('./register')
const login = require('./login')
const logout = require('./logout')
const current = require('./currentUser')
const updateSubscription = require('./updateSubscription')
const updateAvatar = require('./updateUsersAvatar')
const verify = require('./verify')
const verifyAgain = require('./varifyAgain')

module.exports = {
  register,
  login,
  logout,
  current,
  updateSubscription,
  updateAvatar,
  verify,
  verifyAgain
}

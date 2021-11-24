const register = require('./register')
const login = require('./login')
const logout = require('./logout')
const current = require('./currentUser')
const updateSubscription = require('./updateSubscription')
const updateAvatar = require('./updateUsersAvatar')

module.exports = {
  register,
  login,
  logout,
  current,
  updateSubscription,
  updateAvatar
}

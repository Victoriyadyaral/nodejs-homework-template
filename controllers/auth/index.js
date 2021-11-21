const register = require('./register')
const login = require('./login')
const logout = require('./logout')
const current = require('./currentUser')

module.exports = {
  register,
  login,
  logout,
  current
}

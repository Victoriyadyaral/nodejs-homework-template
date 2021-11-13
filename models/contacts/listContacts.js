const fs = require('fs/promises')

const contactsPath = require('./contactsPath')

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, 'utf-8')
  const allContacts = JSON.parse(data)
  if (!allContacts) {
    return []
  }
  return allContacts
}

module.exports = listContacts

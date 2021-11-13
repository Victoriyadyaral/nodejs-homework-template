const fs = require('fs/promises')

const listContacts = require('./listContacts')
const contactsPath = require('./contactsPath')

const removeContact = async (contactId) => {
  const allContacts = await listContacts()
  const index = allContacts.findIndex(contact => contact.id === parseInt(contactId))
  if (index === -1) {
    console.log("This contact isn't in contacts")
    return null
  }
  const removeContact = allContacts.splice(index, 1)
  const contactsString = JSON.stringify(allContacts)
  await fs.writeFile(contactsPath, contactsString)
  return removeContact
}

module.exports = removeContact

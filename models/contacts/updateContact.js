const fs = require('fs/promises')

const listContacts = require('./listContacts')
const contactsPath = require('./contactsPath')

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts()
  const idx = allContacts.findIndex(item => item.id === contactId)
  if (idx === -1) {
    return null
  }
  allContacts[idx] = { ...body, contactId }
  allContacts.push(allContacts[idx])
  const contactsString = JSON.stringify(allContacts)
  await fs.writeFile(contactsPath, contactsString)
  return allContacts[idx]
}

module.exports = updateContact

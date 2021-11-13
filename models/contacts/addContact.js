const fs = require('fs/promises')
const crypto = require('crypto')

const listContacts = require('./listContacts')
const contactsPath = require('./contactsPath')

const addContact = async (body) => {
  const allContacts = await listContacts()
  const newContact = { ...body, id: crypto.randomUUID() }
  allContacts.push(newContact)
  const contactsString = JSON.stringify(allContacts)
  await fs.writeFile(contactsPath, contactsString)
  return newContact
}

module.exports = addContact

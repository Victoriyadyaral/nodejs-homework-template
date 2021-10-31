const fs = require('fs/promises')
const path = require('path')
const crypto = require('crypto')
// const contacts = require('./contacts.json')

const contactsPath = path.join(__dirname, './contacts.json')

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, 'utf-8')
  const allContacts = JSON.parse(data)
  if (!allContacts) {
    return []
  }
  return allContacts
}

const getContactById = async (contactId) => {
  const allContacts = await listContacts()
  const result = allContacts.find(contact => contact.id === parseInt(contactId))
  if (!result) {
    console.log(`Contact with ID "${contactId}" not found!`)
    return null
  }
  return result
}

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

const addContact = async (body) => {
  const allContacts = await listContacts()
  const newContact = { ...body, id: crypto.randomUUID() }
  allContacts.push(newContact)
  const contactsString = JSON.stringify(allContacts)
  await fs.writeFile(contactsPath, contactsString)
  return newContact
}

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

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}

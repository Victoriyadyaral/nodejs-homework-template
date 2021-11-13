const listContacts = require('./listContacts')

const getContactById = async (contactId) => {
  const allContacts = await listContacts()
  const result = allContacts.find(contact => contact.id === parseInt(contactId))
  if (!result) {
    console.log(`Contact with ID "${contactId}" not found!`)
    return null
  }
  return result
}

module.exports = getContactById

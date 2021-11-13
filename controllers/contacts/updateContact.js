const { NotFound } = require('http-errors')
const { contactOperations } = require('../../models/contacts')

const updateContact = async (req, res) => {
  const { contactId } = req.params
  const result = await contactOperations.updateContact(contactId, req.body)
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result
    }
  })
}

module.exports = updateContact

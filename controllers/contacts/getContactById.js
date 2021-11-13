const { NotFound } = require('http-errors')

const { contactOperations } = require('../../models/contacts')

const getContactById = async (req, res) => {
  const { contactId } = req.params
  const result = await contactOperations.getContactById(contactId)
  if (!result) {
    throw new NotFound('Contact not found')
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result
    }
  })
}

module.exports = getContactById

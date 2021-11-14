const { NotFound } = require('http-errors')
const { Contact } = require('../../models')

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params
  const { favorite } = req.body
  if (!req.body.favorite) {
    return res.status(400).json({ status: 400, message: 'Missing field favorite' })
  }
  const result = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true })
  if (!result) {
    throw new NotFound(`Contact with contactId=${contactId} not found`)
  }
  res.json({
    status: 'Success',
    code: 200,
    data: {
      result
    }
  })
}

module.exports = updateStatusContact

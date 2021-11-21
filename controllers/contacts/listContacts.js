const { Contact } = require('../../models')

const listContacts = async (req, res) => {
  const { page, limit, favorite } = req?.query
  const { _id } = req.user

  if (page || limit) {
    const skip = (page - 1) * limit
    const result = await Contact.find(
      { owner: _id },
      '_id name phone favorite owner email',
      { skip, limit: +limit }).populate('owner', '_id email')
    return res.json({
      status: 'success',
      code: 200,
      data: {
        result
      }
    })
  }

  if (favorite) {
    const result = await Contact.find(
      { owner: _id, favorite: Boolean(favorite) },
      '_id name phone favorite owner email')
      .populate('owner', '_id email')
    return res.json({
      status: 'success',
      code: 200,
      data: {
        result
      }
    })
  }

  const result = await Contact.find({ owner: _id })
  res.json({
    status: 'success',
    code: 200,
    data: {
      result
    }
  })
}

module.exports = listContacts

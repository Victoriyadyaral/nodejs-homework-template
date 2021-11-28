const fs = require('fs/promises')
const path = require('path')
const { NotFound } = require('http-errors')
const moment = require('moment')

const { User } = require('../../models')
const { getSizeForAvatar } = require('../../helpers')

const avatarsDir = path.join(__dirname, '../../public/avatars')

const updateAvatar = async (req, res) => {
  const { id } = req.user
  const { path: tempUpload, originalname } = req.file
  try {
    await getSizeForAvatar(tempUpload)
    const date = moment().format('DD-MM-YYYY_hh-mm-ss')
    const filename = `${id}_${date}_${originalname}`
    const resultUpload = path.join(avatarsDir, id, filename)
    await fs.rename(tempUpload, resultUpload)
    const avatar = path.join('/users', id, filename)
    const result = await User.findByIdAndUpdate(id, { avatarURL: avatar }, { new: true })
    if (!result) {
      throw new NotFound(`User with id=${id} not found`)
    }
    const avatarURL = result.avatarURL
    res.json({
      status: 'success',
      code: 200,
      data: {
        avatarURL
      }
    })
  } catch (error) {
    await fs.unlink(tempUpload)
    throw error
  }
}

module.exports = updateAvatar

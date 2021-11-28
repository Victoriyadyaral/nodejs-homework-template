const Jimp = require('jimp')

async function getSizeForAvatar(filename) {
  const avatar = await Jimp.read(filename)
  await avatar
    .autocrop()
    .resize(250, 250)
    .writeAsync(filename)
  return avatar
}

module.exports = getSizeForAvatar

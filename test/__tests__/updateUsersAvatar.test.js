const request = require('supertest')
const fs = require('fs/promises')
const app = require('../../app')
const { User } = require('../../models/user')

const user = {
  _id: '619d614b07cb3a9cd30b5eb8',
  email: 'evd@example.com',
  subscription: 'starter',
  avatarURL: '\\users\\619d6e5dba5b038224aaffe3\\619d6e5dba5b038224aaffe3_24-11-2021_12-37-56_images.jpeg',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOWQ2ZTVkYmE1YjAzODIyNGFhZmZlMyIsImlhdCI6MTYzODEyOTIwNywiZXhwIjoxNjM4MTMyODA3fQ.MWjxtdeguqZgia4lv1Gk93Pq_Z3hkJhcdf8RsEN6NLQ',
  password: '$2a$10$cVs7Als2w3nmrwo2IH8Yr.dLRea5euHnLUV/6lBy99.ds3gaiBVWK',
  createdAt: '2021-11-23T22:42:37.360Z',
  updatedAt: '2021-11-24T10:37:56.607Z'
}

const token = user.token

jest.spyOn(User, 'findByIdAndUpdate').mockImplementationOnce(() => user.avatarURL)
jest.spyOn(User, 'findById').mockImplementationOnce(() => user)

describe('tests for the route api/users/avatar', () => {
  it('Upload success should return 200 status', async () => {
    const buffer = await fs.readFile('./test/image.jpeg')
    const res = await request(app)
      .patch('/api/users/avatar')
      .set('Authorization', `Bearer ${token}`)
      .attach('avatar', buffer, 'image.jpeg')
    expect(res.status).toEqual(200)
    expect(res.body).toBeDefined()
    expect(res.body.data).toHaveProperty('avatarUrl')
  })

  it('should receive status 401 with invalid token in patch request', async () => {
    const buffer = await fs.readFile('./test/image.jpeg')
    const { status } = await request(app)
      .patch('/api/users/avatar')
      .set('Authorization', 'Bearer 65298abcjghkhjl')
      .send('avatar', buffer, 'image.jpeg')
    expect(status).toEqual(401)
  })
})

const { Unauthorized } = require('http-errors')
const authenticate = require('../../middlewares/authenticate')
const { User } = require('../../models/user')

const user = {
  _id: '619d614b07cb3a9cd30b5eb8',
  email: 'evd@example.com',
  subscription: 'starter',
  avatarURL: '\\users\\619d6e5dba5b038224aaffe3\\619d6e5dba5b038224aaffe3_24-11-2021_12-37-56_images.jpeg',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOWQ2ZTVkYmE1YjAzODIyNGFhZmZlMyIsImlhdCI6MTYzODExMDA2NywiZXhwIjoxNjM4MTEzNjY3fQ.xqwcH9sTQ8usqrjrWUAQZbGc2QxLxm8XmUY64MMZWLI',
  password: '$2a$10$cVs7Als2w3nmrwo2IH8Yr.dLRea5euHnLUV/6lBy99.ds3gaiBVWK',
  createdAt: '2021-11-23T22:42:37.360Z',
  updatedAt: '2021-11-24T10:37:56.607Z'
}

jest.spyOn(User, 'findById').mockImplementationOnce(() => user)

const token = user.token

const mockReq = {
  headers: {
    authorization: `Bearer ${token}`
  },
  user
}

const mockRes = {}

const mockNext = jest.fn()

describe('tests for middleware by authorization', function () {
  test('without Bearer in the header', async () => {
    const mockReq = {
      headers: {
        authorization: ` ${token}`
      }
    }

    await authenticate(mockReq, mockRes, mockNext)
    expect(mockNext).toHaveBeenCalledWith(new Unauthorized())
  })

  it('token is not valid in the header', async () => {
    const token = 'eyJhbGci'
    const mockReq = {
      headers: {
        authorization: `Bearer ${token}`
      }
    }

    await authenticate(mockReq, mockRes, mockNext)
    expect(mockNext).toHaveBeenCalledWith(new Unauthorized('jwt malformed'))
  })

  it('without token in the header', async () => {
    const mockReq = {
      headers: {
        authorization: 'Bearer '
      }
    }

    await authenticate(mockReq, mockRes, mockNext)
    expect(mockNext).toHaveBeenCalledWith(new Unauthorized('jwt must be provided'))
  })

  it('token is valid in the header', async () => {
    await authenticate(mockReq, mockRes, mockNext)
    expect(mockReq.headers.authorization).toBe(`Bearer ${token}`)
    expect(mockReq.user._id).toEqual(user._id)
    expect(mockNext).toHaveBeenCalled()
  })
})

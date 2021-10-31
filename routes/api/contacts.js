const express = require('express')
const { NotFound, BadRequest } = require('http-errors')
const Joi = require('joi')
const contactOperations = require('../../model/index')
const router = express.Router()

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})

router.get('/', async (_, res, next) => {
  try {
    const result = await contactOperations.listContacts()
    res.json({
      status: 'success',
      code: 200,
      data: {
        result
      }
    })
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body)
    if (error) {
      throw new BadRequest(error.message)
    }
    const result = await contactOperations.addContact(req.body)
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        result
      }
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contactOperations.removeContact(contactId)
    if (!result) {
      throw new NotFound(`Contact with id=${contactId} not found`)
    }
    res.json({
      status: 'success',
      code: 200,
      message: 'Remove success'
    })
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body)
    if (error) {
      throw new BadRequest(error.message)
    }
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
  } catch (error) {
    next(error)
  }
})

module.exports = router

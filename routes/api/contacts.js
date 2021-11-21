const express = require('express')
const { contacts: controllers } = require('../../controllers')
const { controllerWrapper, validation, authenticate } = require('../../middlewares')
const { joiContactSchema } = require('../../models/contact')

const router = express.Router()

router.get('/', authenticate, controllerWrapper(controllers.listContacts))

router.get('/:contactId', authenticate, controllerWrapper(controllers.getContactById))

router.post('/', authenticate, validation(joiContactSchema), controllerWrapper(controllers.addContact))

router.delete('/:contactId', authenticate, controllerWrapper(controllers.removeContact))

router.put('/:contactId', authenticate, validation(joiContactSchema), controllerWrapper(controllers.updateContact))

router.patch('/:contactId/favorite', authenticate, controllerWrapper(controllers.updateStatusContact))

module.exports = router

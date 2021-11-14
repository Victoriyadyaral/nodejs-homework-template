const express = require('express')
const { contacts: controllers } = require('../../controllers')
const { controllerWrapper, validation } = require('../../middlewares')
const { joiContactSchema } = require('../../models/contact')

const router = express.Router()

router.get('/', controllerWrapper(controllers.listContacts))

router.get('/:contactId', controllerWrapper(controllers.getContactById))

router.post('/', validation(joiContactSchema), controllerWrapper(controllers.addContact))

router.delete('/:contactId', controllerWrapper(controllers.removeContact))

router.put('/:contactId', validation(joiContactSchema), controllerWrapper(controllers.updateContact))

router.patch('/:contactId/favorite', controllerWrapper(controllers.updateStatusContact))

module.exports = router

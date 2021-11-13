const express = require('express')
const { contacts: controllers } = require('../../controllers')
const { controllerWrapper } = require('../../middlewares')
const router = express.Router()

router.get('/', controllerWrapper(controllers.listContacts))

router.get('/:contactId', controllerWrapper(controllers.getContactById))

router.post('/', controllerWrapper(controllers.addContact))

router.delete('/:contactId', controllerWrapper(controllers.removeContact))

router.put('/:contactId', controllerWrapper(controllers.updateContact))

module.exports = router

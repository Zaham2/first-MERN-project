const express = require('express');
const router = express.Router()
const usersController = require('../controllers/usersController')

// we will have a different controller for each http method
router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createUser)
    .patch(usersController.updateUser)  //what is the diff between this and PUT?
    .delete(usersController.deleteUser)

    module.exports = router
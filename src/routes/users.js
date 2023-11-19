const express = require('express');
const UserController = require('../controller/users.js')

const router = express.Router();

// CREATE - POST
router.get('/', UserController.getAllUsers);

// READ - GET
router.post('/', UserController.createNewUser);

// UPDATE - PETCH
router.patch('/:idUser', UserController.updateUser);

// DELETE - DELETE
router.delete('/:idUser', UserController.deleteUser);

module.exports = router;
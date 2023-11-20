const express = require('express');
const UserController = require('../controller/users.js')
const Multer = require('multer')
const imgUpload = require('../models/imgUpload')
const router = express.Router();

// CREATE - POST
router.get('/', UserController.getAllUsers);

// READ - GET
router.post('/', UserController.createNewUser);

// UPDATE - PETCH
router.patch('/:idUser', UserController.updateUser);

// DELETE - DELETE
router.delete('/:idUser', UserController.deleteUser);

router.post("/uploadImage", multer.single('image'), imgUpload.uploadToGcs, (req, res, next) => {
    const data = req.body
    if (req.file && req.file.cloudStoragePublicUrl) {
        data.imageUrl = req.file.cloudStoragePublicUrl
    }

    res.send(data)
})


module.exports = router;
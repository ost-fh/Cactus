const express = require('express')
const { getLibraries, postLibrary } = require('../controllers/libraryController')
const router = express.Router()

router.get('/', getLibraries)

router.post('/', postLibrary)

// router.get('/:id/')

module.exports = router
const express = require('express')
const { getLibraries, postLibrary, getLibrary } = require('../controllers/libraryController')
const router = express.Router()

router.get('/', getLibraries)

router.post('/', postLibrary)

router.get('/:id/', getLibrary)

module.exports = router
const { Library } = require("../models/libraryModel")

const getLibraries = async (req, res) => {
    const libraries = await Library.find()
    res.status(200).json(libraries)
}

const postLibrary = async (req, res) => {
    console.log(req.body)
    if (!req.body.title) {
        res.status(400)
        throw new Error('please add textfield')
    }
    const library = await Library.create({
        title: req.body.title,
        linkHome: req.body.linkHome,
        linkDocs: req.body.linkDocs,
        currentVersion: req.body.currentVersion,
    })
    res.status(200).json(library)

    // res.status(200).json({ message: "create Lib" })
}

module.exports = {
    getLibraries,
    postLibrary,
}
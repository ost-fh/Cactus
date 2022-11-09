const mongoose = require("mongoose")

const versionSchema = mongoose.Schema({
    version: String,
    tests: []
})

const librarySchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    componentsTested: {
        type: Number,
    },
    totalScore: {
        type: Number,
    },
    linkHome: {
        type: String,
        required: true
    },
    linkDocs: {
        type: String,
        required: true
    },
    currentVersion: {
        type: String,
        required: true
    },
    testsByVersion: [versionSchema],
}, {
    timestamps: true,
})



module.exports = {
    Library: mongoose.model('Library', librarySchema),
    Version: mongoose.model('Version', versionSchema)
} 
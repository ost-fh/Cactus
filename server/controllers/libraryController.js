const { Library } = require("../models/libraryModel");

const getLibraries = async (req, res) => {
  const libraries = await Library.find();
  res.status(200).json(libraries);
};

const getLibrary = async (req, res) => {
  const library = await Library.findById(req.params.id);
  if (!library) {
    res.status(400);
    res.json({ message: "Library not found" });
    return;
  }
  res.status(200).json(library);
};

const postLibrary = async (req, res) => {
  const { title, linkHome, linkDocs, currentVersion } = req.body;
  if (!(title && linkHome && linkDocs && currentVersion)) {
    res.status(400);
    res.json({ message: "please add all required fields" });
    return;
  }
  const library = await Library.create({
    title,
    linkHome,
    linkDocs,
    currentVersion,
  });
  res.status(200).json(library);
};

module.exports = {
  getLibraries,
  postLibrary,
  getLibrary,
};

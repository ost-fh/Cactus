const { Library, Version } = require("../models/libraryModel");
const { scoreLibrary } = require("../services/scoring");

const getLibraries = async (req, res) => {
  const libraries = await Library.find();
  res.status(200).json(libraries);
};

const getLibrary = async (req, res) => {
  try {
    const library = await Library.findById(req.params.id);
    res.status(200).json(library);
  } catch (error) {
    res.status(400);
    res.json({ message: "Library not found" });
    return;
  }
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
    versions: [{ version: currentVersion }],
  });
  res.status(200).json(library);
};

const postNewVersion = async (req, res) => {
  const { newVersion } = req.body;
  if (!newVersion) {
    res.status(400);
    res.json({ message: "please provide a new version number" });
    return;
  }
  const library = await Library.findById(req.params.id);
  if (library.versions.find((item) => item.version === newVersion)) {
    console.log("version already exists");
    res.status(400);
    res.json({ message: "version already exists" });
    return;
  }
  library.versions.push(await Version.create({ version: newVersion }));
  library.currentVersion = newVersion;
  await library.save();
  console.log(
    `library POST: added new version ${newVersion} to ${library.title}, id: ${library._id}`
  );
  res.status(200).json(library);
};

const rescoreLibrary = async (req, res) => {
  scoreLibrary(req.params.id);
  res.status(200).json({ message: "success" });
};

module.exports = {
  getLibraries,
  postLibrary,
  postNewVersion,
  getLibrary,
  rescoreLibrary,
};

const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const {
  getLibraries,
  postLibrary,
  getLibrary,
} = require("../controllers/libraryController");
const router = express.Router();

router.get("/", getLibraries);

router.post("/", protect, postLibrary);

router.get("/:id/", getLibrary);

//router.post("/:id", protect, postNewVersion);

module.exports = router;

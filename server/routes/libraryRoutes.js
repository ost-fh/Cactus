const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const {
  getLibraries,
  postLibrary,
  getLibrary,
  postNewVersion,
  rescoreLibrary,
} = require("../controllers/libraryController");
const router = express.Router();

router.get("/", getLibraries);

router.post("/", protect, postLibrary);

router.get("/:id/", getLibrary);

router.get("/:id/score", protect, rescoreLibrary);

router.post("/:id/", protect, postNewVersion);

module.exports = router;

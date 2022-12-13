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

// TODO Remove protect
router.get("/:id/", protect, getLibrary);

//router.post("/:id", protect, postNewVersion);

module.exports = router;

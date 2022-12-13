const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const postTestResult = require("../controllers/testingController");

router.post("/", protect, postTestResult);

module.exports = router;

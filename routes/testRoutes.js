const express = require("express");
const postTestResult = require("../controllers/testController");
const router = express.Router();

router.post("/", postTestResult);

module.exports = router;

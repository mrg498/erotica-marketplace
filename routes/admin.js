const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

router.get("/stories", adminController.getStories);

module.exports = router;

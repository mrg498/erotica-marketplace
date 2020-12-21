const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/", shopController.getIndex);

router.get("/stories", shopController.getStories);

router.get("/audio-only", shopController.getAudioOnly);

router.get("/about", shopController.getAbout);

module.exports = router;

const express = require("express");

const creatorController = require("../controllers/creator");

const router = express.Router();

router.get('/upload-story', creatorController.getUploadStory);

router.post('/upload-story', creatorController.postUploadStory);

module.exports = router;
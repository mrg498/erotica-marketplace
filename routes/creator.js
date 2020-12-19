const express = require("express");
const isAuth = require("../middleware/is-auth").creatorIsAuth;
const creatorController = require("../controllers/creator");

const router = express.Router();

router.get('/dashboard', isAuth, creatorController.getDashboard);

router.get('/upload-story', isAuth, creatorController.getUploadStory);

router.post('/upload-story', isAuth, creatorController.postUploadStory);

router.get('/manage-payment', isAuth, creatorController.getManagePayment);

module.exports = router;
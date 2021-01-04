const express = require("express");
const isAuth = require("../middleware/is-auth").creatorIsAuth;
const creatorController = require("../controllers/creator");

const router = express.Router();

router.get("/dashboard", isAuth, creatorController.getDashboard);

router.get("/upload-story", isAuth, creatorController.getUploadStory);

router.post("/upload-story", isAuth, creatorController.postUploadStory);

router.get("/story-details/:storyId", isAuth, creatorController.getStoryDetails);

router.get("/edit-story/:storyId", isAuth, creatorController.getEditStory)

router.get("/manage-payment", isAuth, creatorController.getManagePayment);

router.get("/edit-profile", isAuth, creatorController.getEditProfile);

module.exports = router;

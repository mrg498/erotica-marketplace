const express = require("express");

const authController = require("../controllers/auth");

const router = express.Router();

router.get("/creator-login", authController.getCreatorLogin);

router.post("/creator-login", authController.postCreatorLogin);

router.post("/creator-logout", authController.postCreatorLogout);

router.get("/creator-signup", authController.getCreatorSignup);

router.post("/creator-signup", authController.postCreatorSignup);

module.exports = router;

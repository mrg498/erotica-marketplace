const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
	res.render("shop/index", {
        pageTitle: 'Erotica Marketplace'
    });
});

router.get("/stories", (req,res,next) => {
    res.render('shop/stories', {
        pageTitle: 'Stories'
    });
});

router.get("/about", (req,res,next)=> {
    res.render('shop/about', {
        pageTitle: 'About'
    })
});

module.exports = router;

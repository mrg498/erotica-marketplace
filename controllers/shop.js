const Story = require('../models/story');

exports.getIndex = (req,res,next) => {
    res.render("shop/index", {
        pageTitle: 'Haven',
        creatorLoggedIn: req.session.creatorLoggedIn
    });
}
exports.getStories = (req,res,next) => {
    res.render('shop/stories', {
        pageTitle: 'Stories',
        creatorLoggedIn: req.session.creatorLoggedIn
    });
}

exports.getAudioOnly = (req,res,next) => {
    res.render('shop/audio-only', {
        pageTitle: 'Audio Porn',
        creatorLoggedIn: req.session.creatorLoggedIn
    });
}

exports.getAbout = (req,res,next)=> {
    res.render('shop/about', {
        pageTitle: 'About',
        creatorLoggedIn: req.session.creatorLoggedIn
    })
}
const Story = require('../models/story');

exports.getIndex = (req,res,next) => {
    res.render("shop/index", {
        pageTitle: 'Haven'
    });
}
exports.getStories = (req,res,next) => {
    res.render('shop/stories', {
        pageTitle: 'Stories'
    });
}

exports.getAudioOnly = (req,res,next) => {
    res.render('shop/audio-only', {
        pageTitle: 'Audio Porn'
    });
}

exports.getAbout = (req,res,next)=> {
    res.render('shop/about', {
        pageTitle: 'About'
    })
}
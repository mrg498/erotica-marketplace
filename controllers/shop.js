const Story = require('../models/story');

exports.getIndex = (req,res,next) => {
    res.render("shop/index", {
        pageTitle: 'Erotica Marketplace'
    });
}
exports.getStories = (req,res,next) => {
    res.render('shop/stories', {
        pageTitle: 'Stories'
    });
}
exports.getAbout = (req,res,next)=> {
    res.render('shop/about', {
        pageTitle: 'About'
    })
}
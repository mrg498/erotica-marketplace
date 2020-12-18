exports.get404 = ((req,res,next) => {
    res.status(404);
    res.render('errors/404', {
        pageTitle: 'Error',
        creatorLoggedIn: req.session.creatorLoggedIn
    });
});
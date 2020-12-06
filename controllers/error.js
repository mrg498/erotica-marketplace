exports.get404 = ((req,res,next) => {
    res.status(404);
    res.send('404 Page Not Found');
});
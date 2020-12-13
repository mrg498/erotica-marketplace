const Creator = require("../models/creator");

exports.getCreatorLogin = (req, res, next) => {
	res.render("creator/login", {
		pageTitle: "Creator Login"
	});
};

exports.postCreatorLogin = (req,res,next) => {
    console.log("Post to creator login");
    req.session.isLoggedIn = true;
    req.session.save((err)=>{
        console.log(err);
        res.redirect("/auth/creator-login");
    }); 
};

exports.postCreatorLogout = (req,res,next) => {
    req.session.destroy((err)=>{
        console.log(err);
        res.redirect("/");
    });
};

exports.getCreatorSignup = (req,res,next) => {
    res.render("creator/signup", {
        pageTitle: 'Creator Signup'
    });
}

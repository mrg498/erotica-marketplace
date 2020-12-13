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

exports.postCreatorSignup = (req,res,next)=> {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    let userExists;
    Creator.findOne({email: email})
    .then(doc => {
        if(doc){
            return userExists = true;
        }
        return Creator.findOne({username: username});
    })
    .then(doc => {
        if(doc){
            return userExists = true;
        }
        const creator = new Creator({
            username: username,
            email: email,
            password: password
        });

        creator.save();
    })
    .then(result => {
        if(userExists){
            console.log("User already exists");
            return res.redirect("/auth/creator-signup");
        }
        console.log("created new user");
        res.redirect("/auth/creator-login");
    })
    .catch(err => {
        console.log(err);
    });
}

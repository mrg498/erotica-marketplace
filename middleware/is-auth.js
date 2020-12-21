exports.creatorIsAuth = (req, res, next) => {
	if (!req.session.creatorLoggedIn) {
		return res.redirect("/creator/login");
	}
	next();
};

exports.customerIsAuth = (req, res, next) => {
	if (!req.session.customerLoggedIn) {
		return res.redirect("/");
	}
	next();
};

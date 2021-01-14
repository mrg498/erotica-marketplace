const path = require("path");

//third party modules
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const csrf = require("csurf");
const MongoDBStore = require("connect-mongodb-session")(session);
const mongoose = require("mongoose");
const flash = require('connect-flash');
require("dotenv").config();
//my modules
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
const creatorRoutes = require("./routes/creator");
const adminRoutes = require("./routes/admin");
const errorController = require("./controllers/error");

//constants
DATABASE_URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env
	.DB_PASSWORD}@cluster0.jckc1.mongodb.net/erotica-marketplace?retryWrites=true&w=majority`;

//create express app
const app = express();
const port = 3000;

const store = new MongoDBStore({
	uri: DATABASE_URI,
	collection: "sessions"
});

//initialize csrf protection
const csrfProtection = csrf();


//third party middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		store: store
	})
);
app.use(flash());

//register csrf middleware
app.use(csrfProtection);

//templates setup
app.set("view engine", "ejs");

//set locals for views
app.use((req,res,next) => {
	res.locals.csrfToken = req.csrfToken();
	res.locals.creatorLoggedIn = req.session.creatorLoggedIn;
	res.locals.flashError = req.flash('error');
	next();
});

//Router objects
app.use(shopRoutes);
app.use("/auth", authRoutes);
app.use("/creator", creatorRoutes);
app.use("/admin", adminRoutes);

//error routes
app.use(errorController.get404);

//connect to database and start server
mongoose.set("useCreateIndex", true);
mongoose
	.connect(DATABASE_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	})
	.then((result) => {
		console.log("database connected");
	})
	.catch((err) => {
		console.log(err);
	});

app.listen(port, () => {
	console.log(`app listening at http://localhost:${port}`);
});

const path = require("path");

//third party modules
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
// modules
const shopRoutes = require("./routes/shop");
const creatorRoutes = require("./routes/creator");
const adminRoutes = require("./routes/admin");
const errorController = require("./controllers/error");

const app = express();
const port = 3000;

//third party middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//templates setup
app.set("view engine", "ejs");

//Router objects
app.use(shopRoutes);
app.use('/creator', creatorRoutes);
app.use('/admin', adminRoutes);

//error routes
app.use(errorController.get404);

//connect to database and start server
mongoose
	.connect(
		`mongodb+srv://${process.env.DB_USERNAME}:${process.env
			.DB_PASSWORD}@cluster0.jckc1.mongodb.net/erotica-marketplace?retryWrites=true&w=majority`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true
		}
	)
	.then((result) => {
		app.listen(port, () => {
			console.log(`app listening at http://localhost:${port}`);
		});
	})
	.catch((err)=>{
		console.log(err);
	});

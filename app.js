const path = require("path");

//third party modules
const express = require("express");
const bodyParser = require("body-parser");
// modules
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");

const app = express();
const port = 3000;

//third party middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//templates setup
app.set("view engine", 'ejs');

//Router objects
app.use(shopRoutes);

//error routes
app.use(errorController.get404);

//server
app.listen(port, () => {
	console.log(`app listening at http://localhost:${port}`);
});

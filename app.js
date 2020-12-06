const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(shopRoutes);

app.use(errorController.get404);

app.listen(port, () => {
	console.log(`app listening at http://localhost:${port}`);
});

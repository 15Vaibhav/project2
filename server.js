var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const cors = require("cors");
var appController = require("./app/appController");
const port = 8081;
app.use(function(req, res, next) {
  var allowedOrigins = ["http://206.189.131.198", "206.189.131.198"];

  var origin = req.headers.origin;

  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Credentials", true);

  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-access-token"
  );

  next();
});

app.use(express.static("../../var/www/html/Images"));

mongoose.connect(
  "mongodb://localhost/vicinitydb",
  { useNewUrlParser: true }
);
var db = mongoose.connection;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/", appController);
app.listen(port, "0.0.0.0");
console.log("running on " + port);

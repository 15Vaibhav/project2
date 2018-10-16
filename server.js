
var express = require('express');
var app  = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const cors =require('cors');
var appController = require('./app/appController');
const port = 8081; 
mongoose.connect('mongodb://localhost/vicinitydb',{ useNewUrlParser: true });
var db = mongoose.connection;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/',appController);
app.listen(port);
console.log("running on "+port);



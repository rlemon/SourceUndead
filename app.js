"use strict";
const express = require('express'),
		bodyParser = require("body-parser"),
		session = require("express-session");

const app = express();

//setup view engine for EJS templating
app.set("view engine", "ejs")
	.use(express.static(__dirname+"/public")); //expose public folder static serve

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
//session setup
app.use(session({
	secret: '1234567890QWERTY',
	resave: false,
	saveUninitialized: true,
	cookie: {secure:false}
}));

const index = require("./routes/index"),
		create = require("./routes/create"),
		login = require("./routes/login"),
		logout = require("./routes/logout");

app.use('/', index);
app.use('/create', create);
app.use('/login', login);
app.use('/logout', logout);

module.exports = app;
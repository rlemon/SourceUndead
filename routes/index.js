"use strict";
const express = require("express"),
	app = express.Router();

/*
	If the user is logged in, redirect to index page
	Else, render the login page
 */
app.get('/', (req, res) => {
	if (!req.session.loggedIn) res.redirect("/login");
	else res.render('index.ejs');
});

module.exports = app;
"use strict";
const express = require("express"),
	app = express.Router();

/*
	If the user is logged in, redirect to index page
	Else, render the login page
 */
app.get('/', (req, res) => {
	req.session.destroy(err => {
		if (err) throw new Error(err);
	});
	res.redirect("/login");
});

module.exports = app;
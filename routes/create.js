"use strict";
const express = require("express"),
	app = express.Router(),
	post = require("../lib/posts");

/*
	Routing for /create

	/get: render createAccount form
	/post: @username @password @email params
		- Post user input to createAccount form, check for existing username
		- If user exists, reject request and send error back
		- Create the user account
 */
app.route("/")
	.get((req, res) => res.render('createAccount.ejs')) //render form
	.post((req,res) => {
		const user = req.body.user;
		const pass = req.body.pass;
		const email = req.body.email;
		post.createAccount(user,pass,email).then(response => res.send(response)); //create/reject account, send to user
	});

module.exports = app;
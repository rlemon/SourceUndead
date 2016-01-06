"use strict";
const express = require('express');
const app = express();
const fs = require("fs");
const db = require("./lib/db");
const bodyParser = require("body-parser");
const post = require("./lib/posts");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const Promise = require("bluebird");
Promise.promisifyAll(bcrypt);

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
	cookie: {secure:true}
}))

/*
	If the user is logged in, redirect to index page
	Else, render the login page
 */
app.get('/', (req, res) => {
	if (!req.session.loggedIn) res.redirect("/login");
	else res.render('index.ejs');
});

/*
	Routing for /login

	/get: render login form
	/post: @username @password params
		- Post user input to login form, retrieve player
		- If user exists, check password for validity, then create session
		- Reject if account does not exist or password is wrong
 */
app.route('/login')
	.get((req, res) => res.render('login.ejs'))
	.post((req, res) => {
		post.login(req.body.user).spread(user => { //fetch player details
			if (user) {
				console.log(req.body.pass, user.password)
				bcrypt.compareAsync(req.body.pass, user.password).then(bool => { //compare to password hash
					console.log("compared pass", bool)
					if (bool) { //create session, return success status
						req.session.loggedIn = true;
						req.session.user = user.id;
						req.session.username = user.username;
						res.send({
							"msg":"You have logged in!",
							"flag":false,
							"title":": Logged In"
						});
						console.log(req.session.username, "Logged in...", req.sessionID);
					} else {
						//reject, password is wrong
						res.send({
							"msg":"Your username and or password is incorrect.",
							"flag":true,
							"title":": Login Failed"
						});
					}
				});
			} else {
				//reject, account does not exist
				res.send({
					"msg":"This username does not exist!",
					"flag":true,
					"title":": Login Failed"
				});
			}
		});
	});

/*
	Routing for /create

	/get: render createAccount form
	/post: @username @password @email params
		- Post user input to createAccount form, check for existing username
		- If user exists, reject request and send error back
		- Create the user account
 */
app.route("/create")
	.get((req, res) => res.render('createAccount.ejs')) //render form
	.post((req,res) => {
		const user = req.body.user;
		const pass = req.body.pass;
		const email = req.body.email;
		console.log(user, pass, email);
		post.createAccount(user,pass,email).then(response => res.send(response)); //create/reject account, send to user
	});

const server = app.listen(8080, () => {
	const port = server.address().port;
	console.log(`SourceUndead has risen from the grave on port ${port}`);
});

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

app.set("view engine", "ejs")
	.use(express.static(__dirname+"/public"));

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(session({
	secret: '1234567890QWERTY',
	resave: false,
	saveUninitialized: true,
	cookie: {secure:true}
}))

app.get('/', (req, res) => {
	if (!req.session.loggedIn) res.redirect("/login");
	else res.render('index.ejs');
});
app.route('/login')
	.get((req, res) => res.render('login.ejs'))
	.post((req, res) => {
		post.login(req.body.user).spread(user => {
			if (user) {
				console.log(req.body.pass, user.password)
				bcrypt.compareAsync(req.body.pass, user.password).then(bool => {
					console.log("compared pass", bool)
					if (bool) {
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
						res.send({
							"msg":"Your username and or password is incorrect.",
							"flag":true,
							"title":": Login Failed"
						});
					}
				});
			} else {
				res.send({
					"msg":"This username does not exist!",
					"flag":true,
					"title":": Login Failed"
				});
			}
		});
	});

//account creation routing
app.route("/create")
	.get((req, res) => res.render('createAccount.ejs'))
	.post((req,res) => {
		const user = req.body.user;
		const pass = req.body.pass;
		const email = req.body.email;
		console.log(user, pass, email);
		post.createAccount(user,pass,email).then(response => res.send(response));
	});

const server = app.listen(8080, () => {
	const port = server.address().port;
	console.log(`SourceUndead has risen from the grave on port ${port}`);
});

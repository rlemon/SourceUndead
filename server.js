"use strict";
const express = require('express');
const app = express();
const fs = require("fs");
const db = require("./lib/db");
const bodyParser = require("body-parser");
const post = require("./lib/posts");

app.set("view engine", "ejs")
	.use(express.static(__dirname+"/public"));

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

let loggedIn = true;
app.get('/', (req, res) => {
	if (!loggedIn) res.redirect("/login");
	else res.render('index.ejs');
});
app.get('/login', (req, res) => res.render('login.ejs'));

//account creation routing
app.route("/create")
	.get((req, res) => res.render('createAccount.ejs'))
	.post((req,res) => {
		let user = req.body.user;
		let pass = req.body.pass;
		let email = req.body.email;
		post.createAccount(user,pass,email).then(response => res.send(response));
	});

const server = app.listen(8080, () => {
	let port = server.address().port;
	console.log(`SourceUndead has risen from the grave on port ${port}`);
});

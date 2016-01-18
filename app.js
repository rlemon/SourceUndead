"use strict";
import express from 'express';
import bodyParser from "body-parser";
import session from "express-session";
import bcrypt from "bcryptjs";
import {login} from "./lib/posts";
import Promise from "bluebird";
import {createAccount} from "./lib/posts";
import socket from "socket.io";
import server from "./server";

console.log(server);

const app = express();
const router = express.Router();

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

app.get('/', (req, res) => {
	console.log("session logged in, ", req.session.loggedIn);
	//if (!req.session.loggedIn) res.redirect("/login");
	res.render('index.ejs');
});

app.get("/create", (req, res) => res.render('createAccount.ejs')) //render form
app.post("/create", (req,res) => {
		const user = req.body.user;
		const pass = req.body.pass;
		const email = req.body.email;
		createAccount(user,pass,email).then(response => res.send(response)); //create/reject account, send to user
	});

app.get("/login", (req, res) => res.render('login.ejs'));
app.post("/login", (req, res) => {
		login(req.body.user).spread(user => {
			let response = {
				"flag" : true,
				"msg" : ""
			} //fetch player details
			if (!user) {
				response.msg = "This username does not exist!";
				return res.send(response);
			}
			console.log(req.body.pass, user.password)
			bcrypt.compareAsync(req.body.pass, user.password).then(bool => { //compare to password hash
				console.log("compared pass", bool)
				if (bool) { //create session, return success status
					req.session.loggedIn = true;
					req.session.user = user.id;
					req.session.username = user.username;
					response.msg = "You have logged in!";
					response.flag = false;
					console.log(req.session.username, "Logged in...", req.sessionID);
				} else {
					//reject, password is wrong
					response.msg = "Your username and or password is incorrect."
					response.flag = true
				}
				return res.send(response)
			});
		});
	});

app.get('/map', (req, res) => {
	res.render("map.ejs");
});

app.get('/logout', (req, res) => {
	req.session.destroy(err => {
		if (err) throw new Error(err);
	});
	res.redirect("/login");
});


const io = socket.listen(server);

console.log("io established");
io.on("connection", socket => {
	console.log("Connection has been made");
	socket.on("something", socket => console.log("Client emitted shit"));
	io.emit("somethingelse");
});

export default app;
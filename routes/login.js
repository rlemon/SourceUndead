"use strict";
import express from "express";
const router = express.Router();
import bcrypt from "bcryptjs";
import {login} from "../lib/posts";
import Promise from "bluebird";
	
Promise.promisifyAll(bcrypt);

/*
	Routing for /login

	/get: render login form
	/post: @username @password params
		- Post user input to login form, retrieve player
		- If user exists, check password for validity, then create session
		- Reject if account does not exist or password is wrong
 */
router.route("/")
	.get((req, res) => res.render('login.ejs'))
	.post((req, res) => {
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

export default router;
"use strict";
import express from "express";
const app = express.Router();
import {createAccount} from "../lib/posts";

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
		createAccount(user,pass,email).then(response => res.send(response)); //create/reject account, send to user
	});

export default app;

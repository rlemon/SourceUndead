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
		//destructure form body into constants
		const {user, pass, email} = req.body;
		createAccount(user,pass,email).then(res.send.bind(res)); //create/reject account, send to user
	});

export default app;
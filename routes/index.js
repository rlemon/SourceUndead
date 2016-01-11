"use strict";
import express from "express";
const app = express.Router();

/*
	If the user is logged in, redirect to index page
	Else, render the login page
 */
app.get('/', (req, res) => {
	console.log("session logged in, ", req.session.loggedIn);
	//if (!req.session.loggedIn) res.redirect("/login");
	res.render('index.ejs');
});

export default app;
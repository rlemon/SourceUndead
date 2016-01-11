"use strict";
import express from 'express';
import bodyParser from "body-parser";
import session from "express-session";

const app = express();

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

import index from "./routes/index";
import create from "./routes/create";
import login from "./routes/login";
import logout from "./routes/logout";

app.use('/', index);
app.use('/create', create);
app.use('/login', login);
app.use('/logout', logout);

export default app;
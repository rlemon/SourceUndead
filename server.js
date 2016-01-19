"use strict";
import express from 'express';
import bodyParser from "body-parser";
import session from "express-session";
import socket from "socket.io";

const app = express();
const router = express.Router();

//create redis handler
//MAKE SURE REDIS IS RUNNING THIS TIME, YOU ASSJACK
import redis from "redis";
const client = redis.createClient(6379, "localhost");

//setup view engine for EJS templating
app.set("view engine", "ejs")
	.use(express.static(__dirname+"/public")); //expose public folder static serve

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

//create the server
const server = app.listen(8080, () => {
	const port = server.address().port;
	console.log(`SourceUndead has risen from the grave on port ${port}`);
});

//attach socket to process
const io = socket.listen(server);

//session middleware so that socket and express share the same session
const sessionMiddleware = session({
	secret: '1234567890QWERTY',
	resave: false,
	saveUninitialized: true,
	cookie: {secure:false}
});

//APPLY THAT SESSION BRAH
io.use(function(socket, next) {
    sessionMiddleware(socket.request, socket.request.res, next);
});

app.use(sessionMiddleware);

//GET/POST routing (EJS templates, POST functions)
import map from "./routes/map";
import index from "./routes/index";
import login from "./routes/login";
import logout from "./routes/logout";
import create from "./routes/create";

//app middleware for checking if logged in
function authenticate(req, res, next) {
	if (!req.session.loggedIn) {
		console.log("Session not authenticated; terminating instance.");
		res.redirect("/login");
	} else next();
}

//apply middleware for template/post routing
app.use("/map", authenticate, map);
app.use("/create", create);
app.use("/login", login);
app.use("/logout", logout);
app.use("/", authenticate, index);

//function routing for socket handlers
import {move} from "./routes/io-functions";

//socket routing
io.sockets.on("connection", socket => {
	console.log("Connection has been made", socket.request.sessionID);
	socket.on("move", (data) => move(client, io, data, socket));
});
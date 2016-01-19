"use strict";
import express from 'express';
import bodyParser from "body-parser";
import session from "express-session";
import socket from "socket.io";

const app = express();
const router = express.Router();

//setup view engine for EJS templating
app.set("view engine", "ejs")
	.use(express.static(__dirname+"/public")); //expose public folder static serve

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

const server = app.listen(8080, () => {
	const port = server.address().port;
	console.log(`SourceUndead has risen from the grave on port ${port}`);
});

const io = socket.listen(server);

const sessionMiddleware = session({
	secret: '1234567890QWERTY',
	resave: false,
	saveUninitialized: true,
	cookie: {secure:false}
});

io.use(function(socket, next) {
    sessionMiddleware(socket.request, socket.request.res, next);
});

app.use(sessionMiddleware);

import map from "./routes/map";
import index from "./routes/index";
import login from "./routes/login";
import logout from "./routes/logout";
import create from "./routes/create";

app.use("/map", map);
app.use("/create", create);
app.use("/login", login);
app.use("/logout", logout);
app.use("/", index);


io.sockets.on("connection", socket => {
	console.log("Connection has been made", socket.request.sessionID);
	io.emit("somethingelse");
});
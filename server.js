"use strict";
import app from './app';
import express from 'express';
import socketio from "socket.io";

const server = app.listen(8080, () => {
	const port = server.address().port;
	console.log(`SourceUndead has risen from the grave on port ${port}`);
});

const io = socketio(server);
io.on("connection", socket => console.log("User connected!"));
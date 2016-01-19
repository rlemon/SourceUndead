"use strict";
export function move(redis, io, data, socket) {
	console.log(`YA BOY MOVED ${data.direction}`);
	const string = `${socket.request.session.username} has moved ${data.direction}`;
	io.emit("somethingelse", {msg:string});
}
"use strict";
import {client} from "../server";

export function move(io, data, socket, bucket) {
	let x = 0;
	let y = 0; //set incrememt to player location to 0
	if (data.direction === "null") {
		return false;
	}
	switch (data.direction) {
		case "nw":
			x--;
			y++;
			break;
		case "ne":
			x++;
			y++
            break;
		case "n":
			y++;
            break;
		case "sw":
			x--;
			y--;
            break;
		case "se":
			x++;
			y--
            break;
		case "s":
			y--;
            break;
		case "w":
			x--;
            break;
		case "e":
			x++;
            break;	
	}
	if (socket.session.player.x + x > 100 || socket.session.player.x + x < 1) x = 0;
	if (socket.session.player.y + y > 100 || socket.session.player.y + y < 1) y = 0;
	socket.session.player.x += x;
	socket.session.player.y += y;
	const string = `${socket.session.player.user} has moved ${data.direction} to [${socket.session.player.x},${socket.session.player.y}]`;
	console.log(string);
	console.log(bucket)
	io.sockets.emit("somethingelse", {msg:string});
}

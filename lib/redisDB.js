"use strict";
import Promise from "bluebird";
import redis from "redis";

//Promise all the things!
Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);

export function spinUp() {
	const client = redis.createClient(6379, "localhost");
	return client;
}

export function print(err, reply) {
	if (err) throw err;
	else console.log(reply);
}
"use strict";
const hash = require("password-hash");
const Promise = require("bluebird");
const db = require("../lib/db");
const mysql = require("mysql");

module.exports = {
	createAccount: createAccount
}

function createAccount(user,pass,email) {
	var check = `SELECT COUNT(username) AS count FROM players WHERE username=${mysql.escape(user)}`;
	return db.query(check).then(data => {
		if (data[0].count) return {
			"msg":"This username has been taken!",
			"flag":true,
			"title":": Taken Username"
		}
		else {
			let sql = `INSERT INTO players
					(username,email,password) 
					VALUES (
						${mysql.escape(user)},
						${mysql.escape(email)},
						${mysql.escape(hash.generate(pass))}
					)`;
			db.query(sql).then(data => {
				let moarSQL = `INSERT INTO player_data (id,x,y) 
							VALUES (
							${mysql.escape(data.insertId)},
							1,
							1
						)`;
				db.query(moarSQL);
			});
			return {
				"msg":"Your account was created! You will be redirected to the login page in 2 seconds.",
				"flag":false,
				"title":": Account Created"
			}
		}
	});
}

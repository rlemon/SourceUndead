"use strict";
const Promise = require("bluebird");
const db = require("../lib/db");
const mysql = require("mysql");
const bcrypt = require('bcryptjs');
Promise.promisifyAll(bcrypt);

module.exports = {
	createAccount: createAccount,
	login:login
}

/*
	Function to create a users account

	@param user - username
	@param pass - password
	@param email - email address
 */
function createAccount(user,pass,email) {
	//check if username already exists
	const check = `SELECT COUNT(username) AS count FROM players WHERE username=${mysql.escape(user)}`;
	return db.query(check).then(data => {
		if (data[0].count) {
			return {
				"msg":"This username has been taken!",
				"flag":true,
				"title":": Taken Username"
			}
		} else {
			//hash password with bcrypt and store account in db
			return bcrypt.hashAsync(pass, 11).then(password => {
				const sql = `INSERT INTO players (username,email,password) VALUES (${mysql.escape(user)}, ${mysql.escape(email)}, ${mysql.escape(password)})`;
				return db.query(sql);
			}).then(() => {
				//return status
				return {
					"msg":"Your account was created! You will be redirected to the login page in 2 seconds.",
					"flag":false,
					"title":": Account Created"
				}
			});
		}
	});
}

//log user into dashboard
function login(user) {
	//check for player existance
	const query = `SELECT username, password FROM players WHERE username = ${mysql.escape(user)}`;
	return db.query(query).then(rows => {
		//if results, return them, otherwise return empty array (non existing account)
		if (!rows.length) return [];
		return [rows[0]];
	});
}
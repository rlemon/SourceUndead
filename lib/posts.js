var hash = require("password-hash");
var Promise = require("bluebird");
var fs = require("fs");
var db = require("../lib/db");
var mysql = require("mysql");

module.exports = {
	createAccount: createAccount,
	login:login,
	refresh:refresh
}

function createAccount(user,pass,email) {
	var check = "SELECT COUNT(name) as count FROM player WHERE name="+mysql.escape(user);
	return db.query(check).then(function(result) {
		console.log(result)
		if (result[0].count) return {
			"msg":"This username has been taken!",
			"flag":true,
			"title":": Taken Username"
		};
		else {
			var sql = "INSERT INTO player (name,email,password) VALUES ("+mysql.escape(user)+","+mysql.escape(email)+","+mysql.escape(hash.generate(pass))+")";
			db.query(sql).then(function(data) {
				var moarSQL = "INSERT INTO player_data (id,x,y) VALUES ("+mysql.escape(data.insertId)+",1,1)";
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

function login(user) {
	//check for player existance
	var query = 'SELECT p.name,p.password,p.id, pd.x, pd.y, pd.hp, pd.maxhp FROM player p INNER JOIN player_data pd ON p.id = pd.id WHERE p.name='+mysql.escape(user);
	return db.query(query).then(function(rows) {
		if (!rows.length) return;
		return [
			rows[0]
		];
	});
}

function refresh(user) {
	var query = 'SELECT p.name, p.id, pd.x, pd.y, pd.hp, pd.maxhp FROM player p INNER JOIN player_data pd ON p.id = pd.id WHERE p.id='+mysql.escape(user);
	return db.query(query).then(function(rows) {
		return [
			rows[0]
		];
	});
}
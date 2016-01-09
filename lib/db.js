"use strict";
const Promise = require("bluebird");
const settings = require("../settings");
const mysql = require("mysql");

//Promise all the things!
Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);

//get config object from settings.js
const db_config = {
	user:settings.db.user,
	password:settings.db.password,
	database:settings.db.database
};

//export db methods for use
module.exports = {
	query: query
}

//create db connection pool
const con = mysql.createPool(db_config);

/*
	Function to take in a basic SQL query, and return results if it's a select
	@param sql string to run query
 */
function query(sql, params) {
	return con.getConnectionAsync().then(connection => {
		return connection.queryAsync(sql,params)
			.then(rows => rows)
			.finally(() => connection.release());
	});
}

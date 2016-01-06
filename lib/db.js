"use strict";
const Promise = require("bluebird");
const settings = require("../settings");
const mysql = require("mysql");

Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);

const db_config = {
	user:settings.db.user,
	password:settings.db.password,
	database:settings.db.database
};

module.exports = {
	query: query
}

const con = mysql.createPool(db_config);
function query(sql) {
	return con.getConnectionAsync().then(connection => {
		return connection.queryAsync(sql)
			.then(rows => rows)
			.finally(() => connection.release());
	});
}
"use strict";
const mysql = require("mysql");
const hash = require("password-hash");
const Promise = require("bluebird");
const settings = require("../settings");

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

let con = mysql.createPool(db_config);

function query(sql) {
	return con.getConnectionAsync().then(connection => {
		return connection.queryAsync(sql)
			.spread((rows,fields) => rows)
			.disposer(() => connection.release());
	});
}
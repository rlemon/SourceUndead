const db = require("../lib/db");

export class Player {
	constructor(id, name, x=null, y=null) {
		this.id = id;
		this.user = name;
		if (x === null || y === null) {
			this.x = Math.floor(Math.random() * 100) + 1;
			this.y = Math.floor(Math.random() * 100) + 1;
		} else {
			this.x = x;
			this.y = y;
		}
	}
}

export function loadPlayerById(id) {
	const sql = "SELECT *  FROM players WHERE id=?";
        const params = [id];
        return db.query(sql, params).then(data => {
		console.log("Loaded player", data);
	});
}

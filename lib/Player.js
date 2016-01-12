var mysql = require("mysql");
var db = require("../lib/db");

function Player(id,x,y,name,hp,maxHP) {
	this.name = name;
	this.id = id;
	this.x = x;
	this.y = y;
	this.hp = hp;
	this.maxHP = maxHP;
}

Player.prototype = {
	constructor:Player,
	move:function(x,y) {
		if ((this.x+x) > 100 || (this.x+x) <= 0) x = 0;
		if ((this.y+y) > 100 || (this.y+y) <= 0) y = 0;
		var sql = "UPDATE player_data SET x=x+"+mysql.escape(x)+", y=y+"+mysql.escape(y)+" WHERE id="+mysql.escape(this.id);
		db.query(sql);
		this.setX(x);
		this.setY(y);
	},
	getX:function() {
		return this.x;
	},
	getY:function() {
		return this.y;
	},
	setX:function(x) {
		this.x += x;
	},
	setY:function(y) {
		this.y += y;
	},
	alterHP:function(num) {
		if ((this.hp += num) < 0) num = 0;
		this.hp += num;
		var sql = "UPDATE player_data SET hp=hp+"+mysql.escape(num)+" WHERE id="+mysql.escape(this.id);
		db.query(sql);
	},
	getHP:function() {
		return this.hp;
	},
	getMaxHP:function() {
		return this.maxHP;
	}
}

module.exports = Player;
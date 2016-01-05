"use strict";
const express = require('express');
const app = express();
const fs = require("fs");

app.set("view engine", "ejs")
	.use(express.static(__dirname+"/public"));

app.get('/', (req, res) => res.render('index.ejs'));

const server = app.listen(8080, () => {
	let port = server.address().port;
	console.log(`SourceUndead has risen from the dead on port ${port}`);
});
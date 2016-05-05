//Server File **NODE APP - EXPRESS APP**

;(function(){
	"use strict";
	
	var PORT = 3000;
	
	var fs = require('fs');
	
	var express = require('express');
	var bodyParser = require('body-parser');
	
	var app = express();
	
	app.use(express.static('public'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));
	
	app.use(express.cookieParser());
	app.use(express.session({
		secret: "joeisawesome"
	}))
	
	var messages = ["this is a message", "this is another message"];
	
	app.get('/messages', function(req, res){
		res.send(JSON.stringify(messages));
	});
	
	app.post("/messages", function(req, res){
		if(!req.body.newMessage){
			res.send("error");
			return;
		}
		messages.push(req.body.newMessage);
		res.send("success");
	});
	
	app.use(function(req, res, next) {
		res.status(404);
		res.send("File not found");
	});
	
	app.listen(PORT, function() {
		console.log("server started on port " + PORT);
	});
	
}());










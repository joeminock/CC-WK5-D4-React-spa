//Server File **NODE APP - EXPRESS APP**

;(function(){
	"use strict";
	
	var PORT = 3000;
	
	var fs = require('fs');
	
	var express = require('express');
	var bodyParser = require('body-parser');
	var cookieParser = require('cookie-parser');
	var config = require('./config.js');
	var expressSession = require('express-session');
	
	var app = express();
	
	//Middleware
	
	
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));
	
	app.use(cookieParser());
	app.use(expressSession({
		secret: config.secret,
		resave: true,
		saveUninitialized: true
	}));
	
	var messages = ["this is a message", "this is another message"];
	
	app.get("/", function(req, res, next){
		if(!req.session.username){
			res.redirect("/login");
			return;
		}
		res.sendfile(__dirname + '/public/index.html');
	});
	
	app.get('/messages', function(req, res){
		if (!req.session.username){
			res.send("error");
			return;
		}
		res.send(JSON.stringify(messages));
	});
	
	app.post("/messages", function(req, res){
		if (!req.session.username){
			res.send("error");
			return;
		}
		
		if(!req.body.newMessage){
			res.send("error");
			return;
		}
		messages.push(req.body.newMessage);
		res.send("success");
	});
	
	app.get("/login", function(req, res, next){
		res.sendfile(__dirname + '/public/login.html');
	});
	
	// Login Hardcoded, needs to be changed to dynamic username and login
	function logInUser(username, password){
		if (username == "joe" && password == "password"){
			return true;
		}
		return false;
	}
	
	app.post("/login", function(req, res){
		if (req.body.username && req.body.password){
			if(logInUser(req.body.username, req.body.password )){
				req.session.username = req.body.username;
				res.redirect("/");
				return;
			}
		}
		res.redirect("/login");
	});
	
	app.use(express.static('public'));
	
	app.use(function(req, res, next) {
		res.status(404);
		res.send("File not found");
	});
	
	app.listen(PORT, function() {
		console.log("server started on port " + PORT);
	});
	
}());










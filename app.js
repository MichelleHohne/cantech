/**
 *
 **/
 
var express = require('express');
// var routes = require('./routes/index');
var http = require('http');
var https = require('https');
var path = require('path');
var config = require('./config.json');
var fs = require("fs");
var app = express(); 

// all environments
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.compress());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({
    secret: "123123a", cookie: {maxAge: 86400000}
}));
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));


app.enable('verbose errors');

// disable them in production
// use $ NODE_ENV=production node examples/error-pages
if ('production' == app.get('env')) {
  app.disable('verbose errors');
}

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
}  

// Index Page
// app.get('/', routes.index);

// Create server
http.createServer(app).listen(3000, function(){
  console.log('Express server listening on port ' + 3000 + ' in ' + app.get('env') + ' mode');
}); 
 
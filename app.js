var express = require('express');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');

var session = require('express-session');
var flash = require('express-flash');
var morgan = require('morgan');
var configDB = require('./config/database.js');



var app = express();

// configuration ===============================================================

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

mongoose.connect(configDB.url); // connect to our database
require('./config/passport')(passport,app); // pass passport for configuration
//require('./config/auth')(app); // pass app for auth configuration

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(morgan('dev'));
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); //read information from htm forms
app.use(cookieParser()); //read cookies - needed for auth
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(
    {
        secret:'thisismysecretmessage',
        saveUninitialized: true,
        resave: true}))
;

//passport config
app.use(passport.initialize());
app.use(passport.session()); //persistent login sesisons
app.use(flash()); //use connect-flash for flash messages stored in session

//routes
require('./app/routes.js')(app,passport);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        console.log(err);
        res.send(err.message);
        //res.render('error', {
        //    message: err.message,
        //    error: err
        //});
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log(err);
    res.send(err);
    //res.render('error', {
    //    message: err.message,
    //    error: {}
    //});
});


module.exports = app;

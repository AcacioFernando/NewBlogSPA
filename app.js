var express = require('express');
var session = require('express-session');
var engine = require('ejs-locals');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('./db');

var routes = require('./routes/usuario/index');
var admin = require('./routes/admin/index');

var app = express();

var sessionOptions = {
    secret: "secret",
    resave : true,
    saveUninitialized : false
};
app.use(session(sessionOptions));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views','usuario','javascripts')));


//Rotas

app.use('/', routes);
app.use('/admin', admin);

app.get('/views/noticia', function(req, res) {
   res.render('usuario/noticia');
});
app.get('/views/noticias', function(req, res) {
    res.render('usuario/noticias');
});
app.get('/views/categoria', function(req, res) {
    res.render('usuario/categoria');
});
app.get('/views/search', function(req, res) {
    res.render('usuario/categoria');
});
app.get('/views/admin', function(req, res) {
    res.render('admin/index');
});
app.get('/views/cadastarnoticia', function(req, res) {
    res.render('admin/postCreate');
});
app.get('/views/deletarnoticia', function(req, res) {
    res.render('admin/postDelete');
})


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;

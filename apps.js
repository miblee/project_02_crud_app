var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars');

//require routes
var routes = require('./routes/index');

var app = express();

//view engine set-up
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts/'}));
// server .hbs templates from views with res.render
app.set('views', path.join(__dirname, 'views'));
// Use Handlebars syntax {{ }}
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//apply the routes to our app
app.use('/', routes);

var port = 3000;
app.listen(port, function(){
  console.log("listening on port " + port);
});

// module.exports = app;

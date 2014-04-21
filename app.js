
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var play = require('./routes/play');
var http = require('http');
var path = require('path');
var ECT = require('ect');

var app = express();


var server = app.listen(process.env.PORT || 3000);
var io = require('socket.io').listen(server);

var ectRenderer = ECT({ watch: true, root: __dirname + '/views', ext : '.ect' });


// all environments
//app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

app.set('view engine', 'ect');
app.engine('ect', ectRenderer.render);

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
app.get('/', routes.index);
app.get('/play', play.play);
app.get('/users', user.list);

app.post('/login', function(req, res) {
    var name = req.body.name;
    console.log(name);
    res.redirect('/play');
});

var cards = [];

io.sockets.on('connection', function (socket) {
    io.sockets.emit('updateCards', cards);
    socket.on('send card', function (data) {
        console.log(data);
        cards.push(data);
        io.sockets.emit('updateCards', cards);
    });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Something broke!');
});

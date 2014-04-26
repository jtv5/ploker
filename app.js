
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var game = require('./routes/play');
var http = require('http');
var path = require('path');
var ECT = require('ect');
var crypto = require('crypto');

var app = express();


var server = app.listen(process.env.PORT || 3000);
var io = require('socket.io').listen(server);

var ectRenderer = ECT({ watch: true, root: __dirname + '/views', ext : '.ect' });

var token = gameID = "";
var name = "";
var cards = {};


// all environments
//app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

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
app.get('/play/:game', game.play);
app.get('/users', user.list);

function getToken() {
    return crypto.randomBytes(Math.ceil(10/2))
        .toString('hex') // convert to hexadecimal format
        .slice(0,10);   // return required number of characters
}

app.post('/login', function(req, res) {
    name = req.body.name;
    token = getToken();
    cards[token] = [];
    res.redirect('/play/' + token);
});


io.sockets.on('connection', function (socket) {
    socket.on('join room', function(data) {
        var room = data.room;
        socket.join(room);
        io.sockets.in(room).emit('updateCards', cards[room]);
        console.log("joined room" + data.room);
    });

    socket.on('send card', function (data) {
        var room = data.room;
        cards[room].push({card: data.card});
        console.log(cards);
        io.sockets.in(room).emit('updateCards', cards[room]);
    });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Something broke!');
});

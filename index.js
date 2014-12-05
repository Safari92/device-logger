var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/:channel_id', function(req, res){
	res.sendFile(__dirname + '/index.html');
});
app.all('/send/:channel_id', function(req, res) {
	var result = {};
	for (key in req.body) {
		if (req.body.hasOwnProperty(key)) {
			result[key] = req.body[key]
		}
	}
	for (key in req.query) {
		if (req.query.hasOwnProperty(key)) {
			result[key] = req.query[key]
		}
	}

	io.emit('message' + req.params.channel_id, result);
	res.jsonp(result);
});

http.listen(4500, function(){
	console.log('listening on *:4500');
});
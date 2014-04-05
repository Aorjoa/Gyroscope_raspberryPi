var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(3000);

function handler (request, response) {
    var file = __dirname + (request.url == '/' ? '/index.html' : request.url);
    fs.readFile(file, function(error, data) {
        if (error) {
            response.writeHead(500);
            return response.end('Error loading index.html');
        }
        response.writeHead(200);
        response.end(data, 'utf-8');
    });
}

io.sockets.on('connection', function (socket) {
  socket.on('gyroData', function (data) {
    socket.broadcast.emit('showData', data);
  });
});
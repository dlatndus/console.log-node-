var http = require('http');

var server = http.createServer();
http.createServer(function (req, res){
    res.writeHead(200, {'Content-Type':'text/html'});

    res.write('<h1>Hello World!</h1>');
    res.end();
}).listen(8080);
var http = require('http');

var server = http.createServer();

http.createServer(function (req, res){
    res.writeHead(200, {"Content-Type":"text/html; charset=utf-8"});
    res.write('<h1>안녕하세요 임수연입니다. : serverlisten-1.js</h1>');
    res.end();
}).listen(3000);
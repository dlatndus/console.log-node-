var http = require('http');
var fs = require('fs');

var server = http.createServer();// 클라이언트 연결 이벤트 처리

var port = 3000;
server.listen(port, function() {
console.log('웹서버가 시작되었습니다. : %d', port);
});

server.on('connection', function(socket) {
    console.log('클라이언트가 접속했습니다. : %s, %d', socket.remoteAddress, socket.remotePort);
    });

var filename = 'img.jpg';
server.on('request', function(req, res){
//클라이언트 요청 이벤트 처리
fs.readFile(filename, function(err, data){
    console.log('클라이언트 요청이 들어왔습니다.');
    res.writeHead(200, {"Content-Type":"image/png"});
    res.write(data);
    res.end();
});
});
//서버종료 이벤트처리
server.on('close', function(){
    console.log('서버가 종료됩니다.')
})
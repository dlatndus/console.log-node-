var http = require('http');

var server = http.createServer();

var port = 3000;
server.listen(port, function() {
console.log('웹서버가 시작되었습니다. : %d', port);
});
// 클라이언트 연결 이벤트 처리
server.on('connection', function(socket) {
console.log('클라이언트가 접속했습니다. : %s, %d', socket.remoteAddress, socket.remotePort);
});

//클라이언트 요청 이벤트 처리
server.on('request', function(req, res){
    console.log('클라이언트 요청이 들어왔습니다.');
    res.writeHead(200, {"Content-Type":"text/html; charset=utf-8"});
    res.write("<!DOCTYPE html>");
    res.write("<html>");
    res.write("<head>");
    res.write("<title>응답 페이지</title>");
    res.write("</head>");
    res.write("<body>");
    res.write("<h1>nodejs로 부터의 응답페이지</h1>");
    res.write("</body>");
    res.write("</html>");
});

//서버종료 이벤트처리
server.on('close', function(){
    console.log('서버가 종료됩니다.')
})
var http = require('http');

var server = http.createServer();

var port = 3000;

var host = '10.96.124.130';

server.listen(port, host, '50000', function(){
    console.log("서버실행")
})
var express = require('express');
var http = require('http');

var app = express();

app.use(function(req, res, next) {
    console.log('첫 번째 미들웨어에서 요청을 처리함.');
    
    var person = {name:'소녀시대', age:20};
    // res.send(person);

    var personStr = JSON.stringify(person);
    // res.send(personStr);

    res.writeHead('200', {'Content-Type':'application/json; charset=utf8'});
    res.write(personStr);
    res.end();

});

http.createServer(app).listen(3000, function() {
console.log('Express 서버가 3000번 포트에서 시작됨.');
});
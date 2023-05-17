var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var static = require('serve-static');

var app = express();
var router = express.Router();

app.use('/public', static(path.join(__dirname, 'public')));

router.route('/process/login/:name').post(function(req, res) {
    console.log('/process/login/:name 처리함');

    var paramName = req.params.name;
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;

    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
    res.write('<div><p>Param name : ' + paramName + '</p></div>');
    res.write('<div><p>Param id : ' + paramId + '</p></div>');
    res.write('<div><p>Param password : ' + paramPassword + '</p></div>');
    res.write("<br><br><a href='/public/login3.html'>로그인 페이지로 돌아가기</a>");
    res.end();


})

app.use('/', router);

http.createServer(app).listen(3000, function() {
console.log('Express 서버가 3000번 포트에서 시작됨.');
});
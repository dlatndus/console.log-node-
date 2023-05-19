var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var static = require('serve-static');
var expressErrorHandler = require('express-error-handler');
var app = express();
var cookieParser = require('cookie-parser')

app.use('/public', static(path.join(__dirname, 'public')));
app.use(cookieParser());

var router = express.Router();

router.route('/process/setUserCookie').get(function(req, res) {
    console.log('/process/setUserCookie 호출함.');
    
   // 쿠키 설정
    res.cookie('user', {
        id: 'asdf',
        name: '소녀시대',
        authorized: true
    });

    // redirect로 응답
    res.redirect('/process/showCookie');
});

router.route('/process/showCookie').get(function(req, res) {
    console.log('/process/showCookie 호출됨.');
    
    res.send(req.cookies);
});

app.use('/', router);

http.createServer(app).listen(3000, function() {
console.log('Express 서버가 3000번 포트에서 시작됨.');
});
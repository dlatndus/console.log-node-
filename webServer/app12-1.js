var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var static = require('serve-static');
var expressErrorHandler = require('express-error-handler');
var cookieParser = require('cookie-parser')
var expressSession = require('express-session');

var app = express();


app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use('/', static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use(expressSession({
    secret:'my key',
    resave:true,
    saveUninitialized:true
}));

var router = express.Router();

router.route('/process/login').post(function(req, res) {
    console.log('/process/login 호출함.');
    

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;

    if(req.session.user){
        //이미 로그인 된상태
        console.log('이미 로그인되어 상품페이지로 이동합니다.');
        res.redirect('/product.html');
    }
    else{
        // 세션 저장
        res.session.user = {
            id: paramId,
            name: '소녀시대',
            authorized: true
        };
        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
        res.write('<h1>로그인 성공</h1>');
        res.write('<div><p>Param id : ' + paramId + '</p></div>');
        res.write('<div><p>Param password : ' + paramPassword + '</p></div>');
        res.write("<br><br><a href='/process/product'>상품페이지로 이동하기</a>");
        res.end();

    }
});

router.route('/process/logout').get(function(req, res) {
    console.log('/process/logout 호출됨.');
    
    if(req.session.user){
        console.log("로그아웃합니다");

        req.session.destroy(function(err){
            if(err) {throw err;}

            console.log("세션을 삭제하고 로그아웃 되었습니다.");
            res.redirect('/login2.html');
        });
    }
    else{
        console.log("아직 로그인되어있지 않습니다");
        res.redirect('/login2.html');
    }
});

router.route('/process/product').get(function(req, res) {
    console.log('/process/product 호출됨.');
    
    if(req.session.user){
        res.redirect('/product.html');
    }
    else{
        res.redirect('/login2.html');
    }
});

app.use('/', router);

var errorHandler = expressErrorHandler({
    static: {
            '404': '.public/404.html'
        }
    });
app.use( expressErrorHandler.httpError(404) );
app.use( errorHandler );

http.createServer(app).listen(3000, function() {
console.log('Express 서버가 3000번 포트에서 시작됨.');
});
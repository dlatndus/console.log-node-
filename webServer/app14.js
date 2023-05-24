var expressSession = require('express-session');

var multer = require('multer');
var fs = require('fs');
var cors = require('cors');

var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var static = require('serve-static');
var expressErrorHandler = require('express-error-handler');
var cookieParser = require('cookie-parser')

var app = express();

app.use('/', static(path.join(__dirname, 'public')));
app.use('/uploads', static(path.join(__dirname, 'uploads')));
app.use(cookieParser());

app.use(expressSession({
    secret:'my key',
    resave:true,
    saveUninitialized:true
}));

app.use(cors());

var storage = multer.diskStorage({
    destination:function(req, file, callback){
        callback(null, 'uploads')
    },
    filename:function(req, file, callback){
        var extension = path.extname(file.originalname);
        var basename = path.basename(file.originalname);
        callback(null, basename + Date.now() + extension);
    }
});

var upload = multer({
    storage:storage,
    limits:{
        files:10,
        fileSize:1024*1024*1024
    }
});

var router = express.Router();

router.route('/process/photomulti').post(upload.array('photo', 10), function(req, res) {
    console.log('/process/photomulti 호출함.');
    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    try{
        var files = req.files;

        // 현재의 파일 정보를 저장할 변수 선언
        var originalname = '',
            filename = '',
            mimetype = '',
            size = 0;

            if (Array.isArray(files)) { 
                // 배열에 들어가 있는 경우 (설정에서 1개의 파일도 배열에 넣게 했음)
                console.log("배열에 들어있는 파일 갯수 : %d", files.length);
           
                for (var index = 0; index < files.length; index++) {
                    console.log('#==========업로드된 ' + (index + 1) +'번째 파일 정보==============#')
                    originalname = files[index].originalname;
                    filename = files[index].filename;
                    mimetype = files[index].mimetype;
                    size = files[index].size;
                    console.log('현재 파일 정보 : ' + originalname + ', ' + filename + ', ' + mimetype + ', ' + size);
                    
                    res.write('<h3>' + (index+1) + '파일 업로드 성공</h3>');
                    res.write('<hr/>');
                    res.write('<p>원본 파일명 : ' + originalname + '-> 저장파일명 : ' + filename + '</p>');
                    res.write('<p>MIME TYPE : ' + mimetype + '</p>');  
                    res.write('<p>파일 크기 : ' + size + '</p>');  
                    res.end();
                }
            }
    }
    catch(err){
        console.dir(err.stack);
    }
});

app.use('/', router);

http.createServer(app).listen(3000, function() {
console.log('Express 서버가 3000번 포트에서 시작됨.');
});
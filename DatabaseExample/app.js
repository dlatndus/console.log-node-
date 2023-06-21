// Express 기본 모듈 불러오기
var express = require('express')
  , http = require('http')
  , path = require('path');

// Express의 미들웨어 불러오기
var bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , static = require('serve-static')
  , errorHandler = require('errorhandler');

// 에러 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');

// Session 미들웨어 불러오기
var expressSession = require('express-session');

// 익스프레스 객체 생성
var app = express();


// 기본 속성 설정
app.set('port', process.env.PORT || 3000);

// body-parser를 이용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false }))

// body-parser를 이용해 application/json 파싱
app.use(bodyParser.json())

// public 폴더를 static으로 오픈
app.use('/public', static(path.join(__dirname, 'public')));
 
// cookie-parser 설정
app.use(cookieParser());

// 세션 설정
app.use(expressSession({
	secret:'my key',
	resave:true,
	saveUninitialized:true
}));


//===== 데이터베이스 연결 =====//

// 몽고디비 모듈 사용

var MongoClient = require('mongodb').MongoClient;

let database;
async function connectDB() {
// 데이터베이스 연결 정보
const databaseUrl = 'mongodb://127.0.0.1:27017/local';
// MongoClient 생성자 옵션
const options = { useUnifiedTopology: true };

try {
  // 데이터베이스 연결
  const client = new MongoClient(databaseUrl, options);
  await client.connect();
  console.log('데이터베이스에 연결되었습니다. : ' + databaseUrl);
  // database 변수에 할당
  database = client.db('local');
  } catch (err) {
  throw err;
  }
}
connectDB();

async function authUser(database, id, password, callback) {
  try {
  console.log('authUser 호출됨 : ' + id + ', ' + password);
  // users 컬렉션 참조
  var users = database.collection('users');
  var docs = await users.find({"id":id, "password":password}).toArray();
  // console.log(docs);
  if (docs.length > 0) { // 조회한 레코드가 있는 경우 콜백 함수를 호출하면서 조회결과 전달
  console.log('아이디 [%s], 패스워드 [%s] 가 일치하는 사용자 찾음.', id, password);
  callback(null, docs);
  } else { // 조회한 레코드가 없는 경우 콜백 함수를 호출하면서 null, null 전달
  console.log("일치하는 사용자를 찾지 못함.");
  callback(null, null);
  }
  } catch (err) {
  console.error('데이터베이스 연결에 실패했습니다:', err);
  throw err;
  }
}

  var router = express.Router();
 
  router.route('/process/login').post(function(req, res) {
  console.log('/process/login 호출됨.');
  var paramId = req.body.id || req.query.id;
  var paramPassword = req.body.password || req.query.password;
  
  if(database) {
  authUser(database, paramId, paramPassword, function(err, docs) {
  if(err) {throw err;}
  
  if(docs) {
  console.dir(docs);
  var username = docs[0].name;
  res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
  res.write('<h1>로그인 성공</h1>');
  res.write('<div><p>사용자 아이디 : ' + paramId + '</p></div>');
  res.write('<div><p>사용자 이름 : ' + username + '</p></div>');
  res.write("<br><br><a href='/public/login.html'>다시 로그인하기</a>");
  res.end();
  }
  else{
    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>로그인 실패</h1>');
  res.write('<div><p>아이디와 패스워드를 다시 확인하십시오</p></div>');
  res.write('<div><p>사용자 이름 : ' + username + '</p></div>');
  res.write("<br><br><a href='/public/login.html'>다시 로그인하기</a>");
  res.end();
  }
});
  }else{
    res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
    res.write('<h1>데이터베이스 연결 실패</h1>');
  res.write('<div><p>데이터베이스에 연결하지 못했습니다</p></div>');
  res.end();
  }
});

	// 라우터 객체 등록
  app.use('/', router);

		
// 404 에러 페이지 처리
var errorHandler = expressErrorHandler({
 static: {
   '404': './public/404.html'
 }
});

app.use( expressErrorHandler.httpError(404) );
app.use( errorHandler );


// Express 서버 시작
http.createServer(app).listen(app.get('port'), function(){
  console.log('서버가 시작되었습니다. 포트 : ' + app.get('port'));

  // 데이터베이스 연결을 위한 함수 호출

   
});

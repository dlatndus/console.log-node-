var login = function(req, res) {
	console.log('/process/login 호출됨.');

	// 요청 파라미터 확인
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    //데이터베이스 객체 참조
     var database = req.app.get('database');
	
    console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword);
	
    // 데이터베이스 객체가 초기화된 경우, authUser 함수 호출하여 사용자 인증
	if (database.db) {
		authUser(database, paramId, paramPassword, function(err, docs) {
			// 에러 발생 시, 클라이언트로 에러 전송
			if (err) {
                console.error('사용자 로그인 중 에러 발생 : ' + err.stack);
                
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>사용자 로그인 중 에러 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
				res.end();
                
                return;
            }
			
            // 조회된 레코드가 있으면 성공 응답 전송
			if (docs) {
				console.dir(docs);

                // 조회 결과에서 사용자 이름 확인
				var username = docs[0].name;
				
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h1>로그인 성공</h1>');
				res.write('<div><p>사용자 아이디 : ' + paramId + '</p></div>');
				res.write('<div><p>사용자 이름 : ' + username + '</p></div>');
				res.write("<br><br><a href='/public/login.html'>다시 로그인하기</a>");
				res.end();
			
			} else {  // 조회된 레코드가 없는 경우 실패 응답 전송
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h1>로그인  실패</h1>');
				res.write('<div><p>아이디와 패스워드를 다시 확인하십시오.</p></div>');
				res.write("<br><br><a href='/public/login.html'>다시 로그인하기</a>");
				res.end();
			}
		});
	} else {  // 데이터베이스 객체가 초기화되지 않은 경우 실패 응답 전송
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.write('<div><p>데이터베이스에 연결하지 못했습니다.</p></div>');
		res.end();
	}
	
};




var adduser = function(req, res) {
	console.log('/process/adduser 호출됨.');

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    var paramName = req.body.name || req.query.name;
	
    console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword + ', ' + paramName);

    //데이터베이스 객체 참조
    var database = req.app.get('database');
    
    // 데이터베이스 객체가 초기화된 경우, addUser 함수 호출하여 사용자 추가
	if (database.db) {
		addUser(database, paramId, paramPassword, paramName, function(err, addedUser) {
            // 동일한 id로 추가하려는 경우 에러 발생 - 클라이언트로 에러 전송
			if (err) {
                console.error('사용자 추가 중 에러 발생 : ' + err.stack);
                
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>사용자 추가 중 에러 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
				res.end();
                
                return;
            }
			
            // 결과 객체 있으면 성공 응답 전송
			if (addedUser) {
				console.dir(addedUser);
 
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>사용자 추가 성공</h2>');
				res.end();
			} else {  // 결과 객체가 없으면 실패 응답 전송
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>사용자 추가  실패</h2>');
				res.end();
			}
		});
	} else {  // 데이터베이스 객체가 초기화되지 않은 경우 실패 응답 전송
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}
	
};


var listuser = async function(req, res) {
	console.log('/process/listuser 호출됨.');
        //데이터베이스 객체 참조
        var database = req.app.get('database');

	// 데이터베이스 객체가 초기화된 경우, 모델 객체의 findAll 메소드 호출
	if (database.db) {
		// 1. 모든 사용자 검색
		try {
			const results = await database.UserModel.findAll();
		  
			if (results) {  // 결과 객체 있으면 리스트 전송
				console.dir(results);
 
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>사용자 리스트</h2>');
				res.write('<div><ul>');
				
				for (var i = 0; i < results.length; i++) {
					var curId = results[i]._doc.id;
					var curName = results[i]._doc.name;
					res.write('    <li>#' + i + ' : ' + curId + ', ' + curName + '</li>');
				}	
			
				res.write('</ul></div>');
				res.end();
			} else {  // 결과 객체가 없으면 실패 응답 전송
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>사용자 리스트 조회  실패</h2>');
				res.end();
		}
		} catch (err) {
			console.error('사용자 리스트 조회 중 에러 발생 : ' + err.stack);
			res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
			res.write('<h2>사용자 리스트 조회 중 에러 발생</h2>');
			res.write('<p>' + err.stack + '</p>');
			res.end();
			return;
		}
	}
};

var authUser = async function authUser(database, id, password, callback) {
	try {
		console.log('authUser 호출됨 : ' + id + ', ' + password);
		// var users = database.collection('users');
		var docs = await database.UserModel.findById(id);

		if (docs.length > 0) {  // 조회한 레코드가 있는 경우 콜백 함수를 호출하면서 조회 결과 전달
			console.log('아이디 [%s], 패스워드 [%s] 가 일치하는 사용자 찾음.', id, password);
			callback(null, docs);
			return;
		} else {  // 조회한 레코드가 없는 경우 콜백 함수를 호출하면서 null, null 전달
			console.log("일치하는 사용자를 찾지 못함.");
			callback(null, null);
			return;
		}
  } catch (err) {
    console.error('데이터베이스 연결에 실패했습니다:', err);
    // throw err;
  }
}
	
//사용자를 추가하는 함수
var addUser = async function addUser(database, id, password, name, callback) {
	try {
		console.log('addUser 호출됨 : ' + id + ', ' + password + ', ' + name);

		// UserModel 인스턴스 생성
		var user = new database.UserModel({"id":id, "password":password, "name":name});

		// save()로 저장 : 저장 성공 시 addedUser 객체가 파라미터로 전달됨
		var addedUser = await user.save(addedUser);

		if (user) {
			console.log("사용자 데이터 추가함.");
			callback(null, addedUser);
		} else {
			console.log("사용자 데이터 추가하지 못함.");
			callback(null, null);
		}
	} catch (err) {
		console.log(err);
	}
}


module.exports.login = login;
module.exports.adduser = adduser;
module.exports.listuser = listuser;




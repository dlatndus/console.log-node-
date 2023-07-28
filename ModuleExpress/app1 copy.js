
database.on('open', function () {
	console.log('데이터베이스에 연결되었습니다. : ' + databaseUrl); 
	// user 스키마 및 모델 객체 생성 
	createUserSchema(database);
	});
	// 연결 끊어졌을 때 5초 후 재연결
	database.on('disconnected',function() {
		console.log('연결이 끊어졌습니다. 5초 후 재연결합니다.'); 
		setInterval(connectDB, 5000);
	});

		// user 스키마 및 모델 객체 생성
	function createUserSchema(database) {
		// 2. user_schema.js 모듈 불러오기, 다른 모듈로 전달할 수 있으므로 database.UserSchema로 함 
		database.UserSchema = require('./database/user_schema').createSchema(mongoose); 
		// User 모델 정의 - 아직 분리하기 전 임
		UserModel = mongoose.model("users3", database.UserSchema);
		console.log('UserModel 정의함')
	}
	
	


var mongoose = require('mongoose');

var database = {};

database.init = function(app, config){
    console.log('init 호출됨');
    mongoose.connect(app, config);
}

function connect(app, config) {
	// 데이터베이스 연결 정보
	//var databaseUrl = 'mongodb://127.0.0.1:27017/local';
	 
	// 데이터베이스 연결
    console.log('connect 호출됨');
    mongoose.Promise = global.Promise;  // mongoose의 Promise 객체는 global의 Promise 객체 사용하도록 함
	mongoose.connect(config.db_url);
	//mongoose.connect(databaseUrl);
	database.db = mongoose.connection;
	
	database.db.on('error', console.error.bind(console, 'mongoose connection error.'));	
	database.db.on('open', function () {
		//console.log('데이터베이스에 연결되었습니다. : ' + databaseUrl);
        
		// user 스키마 및 모델 객체 생성
		createUserSchema(database);
		
	});
	
    // 연결 끊어졌을 때 5초 후 재연결
	database.db.on('disconnected', connect);
	
}

function createUserSchema(app, config){
    var schemaLen = config.db_schemas.length;
    for(var i =0; i<schemaLen; i++){
        var curItem = config.db_schemas[i];

        var curSchema = require(curItem.file).createSchema(mongoose);

        var curModel = mongoose.model(curItem.collection, curSchema);

        database[curItem.schemaName] = curSchema;
        database[curItem.modelName] = curModel;
    }
    app.set('database', database);

		
}
module.exports = database;
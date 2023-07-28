var login = function(req, res) {
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password; 
    console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword); 
    // 데이터베이스 객체 참조
    var database = req.app.get('database');
    // 데이터베이스 객체가 초기화된 경우, authUser 함수 호출하여 사용자 인증 
    if (database.db) {
    authUser(database, paramId, paramPassword, function(err, docs) {
    };
    var adduser = function(req, res) {
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    var paramName = req.body.name || req.query.name;
    console.log(':' + paramId + ', ' + paramPassword + ', ' + paramName);
    // 데이터베이스 객체 참조
    var database = req.app.get('database');
    // 데이터베이스 객체가 초기화된 경우, addUser 함수 호출하여 사용자 추가
    if (database.db) {
        addUser(database, paramId, paramPassword, paramName, function(err, addedUser) {
        };
        var listuser = function(req, res){
            var database = req.app.get('database');
            if(database.db){
                database.UserModel.findAll(function(err,results){
                    if(err){

                    }
                })
            }
        };

        var authUser = async function authUser(database, id, password, callback) { 
            try {
            console.log('authUser호출됨: '+id + ', ' + password);
            // var users = database.collection('users');
            var docs = await database.UserModel.findById(id);
            V/ 1. 아이디를 이용해 검색 database.UserModel.findById(id....
            if (docs.length>0) { // 조회한 레코드가 있는 경우 콜백 함수를 호출하면서 조회 결과 전달 console.log('0|0|C] [%s), H^ [%] » o1Ãōt, id, password); callback(null, docs);
            return;
            } else { // 조회한 레코드가 없는 경우 콜백 함수를 호출하면서 null, null 전달
            }
            console.log("일치하는 사용자를 찾지 못함.");
            callback(null, null);
            return;
            } catch (err) {
            }
            console.error('GENCH:', err);
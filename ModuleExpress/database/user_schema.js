var crypto = require('crypto');
var Schema = {};
Schema.createSchema = function (mongoose) { //mongoose app.js 에서 설정이 바뀜
// 스키마 정의
var UserSchema = mongoose.Schema({ //var return 
     id: {type: String, required: true, unique: true, 'default':''}, 
     hashed_password: {type: String, required: true, 'default':''},
    salt: {type:String, required:true},
    name: {type: String, index:'hashed', 'default':''},
    age: {type: Number, 'default': -1},
    created_at: {type: Date, index: {unique: false}, 'default': Date.now}, 
    updated_at: {type: Date, index: {unique: false}, 'default': Date.now}
});


// 스키마에 static 메소드 추가
UserSchema.static('findById', function(id, callback) {
    return this.find({id:id}, callback);
});

UserSchema.static('findAll', function(callback) {
    return this.find({}, callback);
});


console.log('UserSchema '); 
return UserSchema;
};
// module.exports에 UserSchema 객체 직접할당
module.exports = Schema;
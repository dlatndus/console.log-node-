//모듈 가져오기
const express = require("express");

//서버 생성하기
const app = express();

app.use(function(request, response, next){
    console.log("첫번째");
    next();

})

app.use(function(request, response, next){
    console.log("두번째");
    next();

})

app.use(function(request, response,next){
    let name = request.query.name;
    let area = request.query.area;
    
    console.log("세번째");
    response.send(`<h1>${name} : ${area}</h1>`);
    next();

})

app.listen(8889,()=>{
    console.log("실행")
})

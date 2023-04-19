//모듈 가져오기
const express = require("express");

//서버 생성하기
const app = express();

app.use(function(request, response){
    response.writeHead(200,{"Context-Type":"text/html; charset=utf-8"});
    response.end("<h1>express 실행</h1>")

})

app.listen(8889,()=>{
    console.log("실행")
})

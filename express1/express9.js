//npm install cookie-parser
//cooke parser 미들웨어 -> 요청쿠키를 추출할 수 있다
//request 객체와 response 객체에 cookies 속성과 cookie라는 메서드가 부여된다
const cookieParser = require("cookie-parser");
const express = require("express");

const app = express();

app.use(cookieParser())
 
app.get('/getCookie',(request, response)=>{
    response.send(request.cookies);

})

app.get('/setCookie',(request, response)=>{
    response.cookie("st1","abc");
    response.cookie("st2",{
        name : "수연",
        age :19.
    });
    response.redirect("/getCookie")

})

app.listen(8889,()=>{
    console.log("실행")
})

//모듈 가져오기
const express = require("express");

//서버 생성하기
const app = express();

let outputData = [];
app.use(function(request, response){
    //json 데이터로 내보내기
    for(let i = 0; i<3; i++)
    {
        outputData.push({
            cont:i,
            name:`name-${i}`
        });
    }

    response.status(200).send(outputData);
    //send() : 매개변수에 따라서 적절하게 응답됨
    //[문자열:html, 배열:json, 객체:json]


})

app.listen(8889,()=>{
    console.log("실행")
})

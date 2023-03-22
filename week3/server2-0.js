//노드 서버 파일로 읽어서 가져오기
//http://localhost:8088/

const http = require('http');
const fs = require("fs");

const server = http.createServer((req, res)=>{
    fs.readFile("./server2_html.html",(err, data)=>{
        if(err){
            throw err;
        }
        res.statusCode = 200; //성공코드
        res.setHeader("Content-Type", "text/html");
        res.end(data);
    })
   
});

server.listen(8088);

server.on('listening', ()=>{
    console.log("8088번 포트에서 서버가 대기중입니다.");
});
    

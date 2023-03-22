//노드 서버 만들기

const http = require('http');

http.createServer((req, res)=>{
    res.write("<h1> hello node </h1>");
    res.end("<p>빈가워요</p>");
});

listen(8088);
    Server.on('listening', ()=>{
        console.log("8088번 서버에서 서버가 대기중입니다")
    });

    Server.on('error', (error)=>{
        console.error(error);
    })
    

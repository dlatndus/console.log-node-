//노드 서버 파일로 읽어서 가져오기
//http://localhost:8088/

const http = require('http');
const fs = require("fs");

const server = http.createServer(async(req, res)=>{
    try{
        const data = await fs.readFile("./server2_html.html");
        res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
        res.end(data);
    }catch(err){
            console.error(err);
            res.writeHead(500,{'Content-Type':'text/plain;charset=utf-8'});
            res.end(err.message);
    }
   
});

server.listen(8088);

server.on('listening', ()=>{
    console.log("8088번 포트에서 서버가 대기중입니다.");
});
    

//url serchParam을 이용하여 다른파일 가져오기
//?filename=index
//?filename = math


const http = require('http');
const fs = require("fs").promises;
const path = require('path');

const server = http.createServer(async(req, res)=>{
    try{
        console.log("URL : ", req.url);
        
        if(req.url == '/favicon.ico'){//탭 앞의 이미지
            return res.writeHead(404);
        }
        const myUrl1 = new URL(req.url, "http://localhost:8088/");
        const myUrl = new URL(req.url, "http://"+req.headers.host+"/")

        console.log("searchParams : ", myUrl.searchParams);
        let fileSet = myUrl.searchParams.get("filename") || "index";

        res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});

        console.log("fileSet : ", fileSet, "__dirname", __dirname);
        console.log("경로 : ", path.join(__dirname, fileSet+".html"));
        const data = await fs.readFile(path.join(__dirname, fileSet+".html"));

        //const data = await fs.readFile(`./${fileSet}.html`); //상대경로
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
    

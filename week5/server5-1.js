const http = require('http');
const fs = require('fs').promises;
const path = require('path');
const url = require('url');
const qs = require('querystring');

const server = http.createServer(async (req, res) => {
    try {
        console.log("URL 부분 : ", req.url);
        if (req.url == '/favicon.ico') {
            res.writeHead(404);
            res.end();
        }
        const pathname = url.parse(req.url, true).pathname;
        if(req.method == "POST"){
            if (pathname == '/create_process') {
                let body = "";
                req.on('data', function (data) {
                    body += data;
                });
                req.on('end', function () {
                    const post = qs.parse(body);
                    const title = post.title;
                    const description = post.description;
                    console.log("내용", post);
                    fs.writeFile(path.join(__dirname, `./textFile/menu_${title}.txt`), description, 'utf-8', function (err) { });
    
    
                    res.writeHead(302, { Location: `/?data=${encodeURIComponent(title)}` });
                    res.end();
                });
            } else if (pathname == '/update_process') {
                let body = "";
                req.on('data', function (data) {
                    body += data;
                });
                req.on('end', async function () {
                    const post = qs.parse(body);
                    const id = post.id;
                    const title = post.title;
                    const description = post.description;
    
                    // await fs.rename(`textFile/menu_${id}.txt`, `textFile/menu_${title}.txt`);
                    // await fs.writeHead(`textFile/menu_${title}.txt`, description, 'utf-8');
                    await fs.rename(path.join(__dirname, `textFile/menu_${id}.txt`), path.join(__dirname, `textFile/menu_${title}.txt`));
                    await fs.writeFile(`textFile/menu_${title}.txt`, description, 'utf-8');
    
                    res.writeHead(302, { Location: `/?date=${encodeURIComponent(title)}` });
                    res.end(templete);
                });
            } else if (pathname == '/delete_process') {
                let body = "";
                req.on('data', function (data) {
                    body += data;
                });
                req.on('end', async function () {
                    const post = qs.parse(body);
                    const id = post.id;
                    console.log("kk", id);
                    await fs.unlink(path.join(__dirname, `textFile/menu_${id}.txt`));
                    res.writeHead(302, { Location: `/` });
                    res.end();
                });
            }
        }else{
        //지정된 폴더의 파일 리스트를 읽어와서 본문 안에 넣기
        const menuFolder = path.join(__dirname, "./textFile");
        console.log("내가 읽고 싶은 폴더 : ", menuFolder);
        const fileList = fs.readdir(menuFolder);
        //요소 만들기
        let fileListText = '<ul>';
        await fileList.then((file_list) => {
            let ii = 0;
            console.log("file_list", file_list);
            while (ii < file_list.length) {
                let dateData = file_list[ii].replace("menu_", "").replace(".txt", "");
                fileListText += `<li><a href = "/?date=${dateData}">${dateData}</a></li>`;
                ii += 1;
            }
        })
        console.log("log", fileListText);
        fileListText += '</ul>';

        const searchParams = new URL(req.url, "http://localhost:8089").searchParams;
        console.log("searchParams", searchParams);

        const param_date = searchParams.get("date") || "null";

        console.log(`${param_date}`);

        const fileName = path.join(__dirname, `./textFile/menu_${param_date}.txt`);
        let fileData = await fs.readFile(fileName);
        let fileDataString = fileData.toString().replace(/\r/g, '<br/>');
        console.log("텍스트 : ", fileDataString);

        
        let subContent = "";
        let title = "";
        if (pathname == '/create') {
            subContent = `<form action = "create_process" method = "post">
            <p> <input type = "text" name = "title" placeholder = "title"/></p>
            <p> <textarea name = "description" placeholder = "description"></textarea></p>
            <p> <input type = "submit"/></p> </form>`;

        } else if (pathname == '/update') {
            subContent = `<form action = "update_process" method = "post">
            <input type = "hidden" name = "id" value ="${param_date}"/>
            <p> <input type = "text" name = "title" placeholder = "title" value ="${param_date}"/></p>
            <p> <textarea name = "description" placeholder = "description">${fileData}</textarea></p>
            <p> <input type = "submit"/></p>
            </form>`;
        }

        const templete = `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>급식 메뉴</title>
            </head>

            <body>
                <h1><a href="/">급식</a></h1>
                ${fileListText}
                <br>
                <h3>${param_date}</h3>
                ${fileDataString}
                <br>
                <input type = "button" value = "create" onclick='location.href="/create"'>
                <input type = "button" value = "update" onclick='location.href="/update?date=${param_date}"'>
                <form action = "delete_process" method="post">
                    <input type = "hidden" name = "id" value = "${param_date}">
                    <input type = "submit" value = "delete" onclick='location.href="/delete"'>
                </form>
                ${subContent}

            </body>
        </html>
        `

        
        res.writeHead(200, { 'Content-Type': 'text/html;charset-utf-8' });
        res.end(templete);

        }


    } catch (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'text/html;charset-utf-8' });
        res.end(err.message);
    }
});

server.listen(8089);
server.on('listening', () => {
    console.log("8089번 포트에서 서버 대기 중");
});
//동기방식으로 바꾸기
const fs = require('fs').promises;

let readData = "읽어오지 못했습니다"

fs.readFile("./readText.text")
.then((data)=>{
    console.log(data.toString());
    readData = data.toString();
    return fs.writeFile("./writeText3.txt",("택스트3 : " + readData));
}).then(()=>{
    return fs.readFile("./writeText3.txt")
}).then((data3)=>{
    console.log("data3 : ", data3.toString())
}).catch((err)=>{
    console.log(err);
});


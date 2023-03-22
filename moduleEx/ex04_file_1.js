const fs = require('fs');

let readData = "읽어오지 못했습니다"
fs.readFile("./readText.text",(err, data) =>{
	if(err){
		throw err;
	}
console.log(data);
console.log(data.toString());
readData = data.toString();
});

fs.writeFile("./writeText.txt", ("읽어온데이터 :" + readData),(err)=>{
if (err){
throw err;
}
console.log("파일쓰기완료")
})
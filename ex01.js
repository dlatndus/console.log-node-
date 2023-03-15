// console.log("node.js 실행하기");
// 파일명 = "ex01";
// console.log("cmd에서 node" + 파일명+ "을 입력해봐요");
// console.log(`cmd에서 node ${파일명}을 입력해봐요`)

//일반형
//(매개변수) => {함수 코드}


// func_arrow1 = (str) => {
//     return "출력1 : " + str
// };

// //매개변수가 하나일 때는 () 생략가능
// //매개변수 => {함수 코드}
// func_arrow2
//  = str => {
//     return "출력2 : " + str
// };

// //함수코드가 return문 하난일 경우 괄호 및 return 생략가능
// //매개변수 => 반환값
// func_arrow3 = str => "출력3 : " + str
// console.log(func_arrow1("fa1"));
// console.log(func_arrow2("fa2"));
// console.log(func_arrow3("fa3"));

// function scopeTest(someVal){
//     //정의되지 않은 변수 typeof
//     console.log("1 : " , typeof test_none); 
//     //함수법위 테스트(곧 블럭안에서 정의 될 변수)
//     console.log("2-1 : " , typeof test_in_var); // => undifined
//     console.log("2-2 : " , typeof test_in_let); // => undifined

//     if(someVal){
//         //블럭 단위 함수 테스트
//         console.log("3-1 : " , typeof test_in_var); // => undifined
//         //var의 경ㅇ우에는 호이스팅 될 때, 값이 undifined로 초기화된다
//         console.log("3-2 : " , typeof test_in_let); //throws 'ReferenceError'
//         //let이나 const 같은 경우에는 일시적 사각지대(TDZ : Temporal Dead Zone)에 놓여진다

//         var test_in_var;
//         let test_in_let;
//         console.log("3-3 : " , typeof test_in_let); // => undifined
//     }
// }
// scopeTest(true)

// const cathy = {
//     "name" : "cathy",
//     "age" : 19,
//     "skills" : ["자바스크립트", "파이썬", "코볼"],
//     "city" : "Seoul"
// };



// //{name : "cathy", age : 19, skills: ["자바스크립트", "파이썬", "코볼"]}
// console.log(cathy);
// delete cathy.city
// //cathy
// console.log(cathy.name);
// console.log(cathy["name"]);
// console.log(cathy);

// const json = '{"result":true,"count":42}';
// const obj = JSON.parse(json);

// //42
// console.log(obj.count);
// //true
// console.log(obj.result);
// console.log(JSON.stringify({x:4, y:6}))

//json문자열 형식ㅇ르 객체로 바꾸기
const jsonData = '{"result" : true, "number":42}'
const obj = JSON.parse(jsonData);

console.log(obj.number);
console.log(obj.result);

//값 혹은 객체를 JSON 형태의 문자열로 변경
console.log(JSON.stringify({x:4, y:2, result: true}));

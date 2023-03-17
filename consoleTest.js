console.time("시간측정")
console.timeEnd("시간측정")

console.log("평범한 로그 메세지","여러값 출력 가능")
console.error("에러메세지를 출력할 때")

const obj = {
    aa:{
        bb:{
            key : "value"
        }
    }
};

console.dir(obj, {colors:false, depth:2})
console.dir(obj, {colors:true, depth:1})
//depth의 기본 값 2


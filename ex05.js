//구조 부해 할당

const example = {a:123, b:{c:11, d:16}};

//case 1:
// const a = example.a;
// const d = example.b.d;

//case 2:
const {a,b:{d}} = example;

arr = [1, 2, 3, 4, 5];

//case1:
// const x = arr[0];
// const y = arr[2];
// const z = arr[3];

//case 2: 
const [x,,y,,z] = arr;

console.log(a,d);
console.log(x,y,z);

//주의할 점
//구조 분해 할당시에도 this를 사용하고 있다면 문제가 생긴다

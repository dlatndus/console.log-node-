const { text_odd, text_even } = require("./moduleText");
const checkNumberFunc = require("./moduleFunc")

function checkStringOddEven(str){
    if(str.length % 2){
        return text_odd;
    }
    return text_even;
}

console.log("useModule : ", checkNumberFunc(10))
console.log("useModule : ", checkStringOddEven("hello"))

module.exports = [checkStringOddEven, checkNumberFunc, text_odd, text_even]
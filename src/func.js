const f1 = function(a){
    return a*a;
}

const f2 = a => a*a*a;

console.log(f1(6));
console.log(f2(6));


//module.exports = f1;
module.exports = {f1 ,f2};

//給它屬性名稱
// module.exports.f1 = f1;
// module.exports.f2 = f2;

// const f2 = (a) => {
//     return a*a;
// }
// console.log(f2(6))

// const f3 = a => a*a;
// console.log(f3(6))

// const f4 = a => {
//     return a*a;
// }
// console.log(f4(6))

// const f5 = (a) => a*a
// console.log(f5(6))

// const f6 = () => {
// let sum = 0;
// for(let i = 1; i <= 10; i++){
//     sum += i;
// }
// return sum;
// }
// console.log(f6());
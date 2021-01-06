const Person = require('./person')

const p1 = new Person(); //預設值
const p2 = new Person('Bill',30);

console.log(p1.toJSON());
console.log(p2.toJSON());

console.log(p2.constructor.name); //類別名稱
console.log(typeof p2); //物件
console.log(p2 instanceof Person); //是不是實體物件
console.log(p2.aaa());
console.log(p2.toString());
console.log(JSON.stringify(p2)); //將JSON轉成字串



// const my_name = require('./func')
// const f1 = require('./func')

// console.log(my_name(10))
// console.log(f1(10))
// console.log(f1 === my_name)

// const my_name = require('./func')
// const f1 = require('./func')
// const f2 = require('./func')

// console.log(f1.f2(10))
// console.log(my_name.f1(10))
// console.log(f2 === my_name)
// console.log(f1 === my_name)

// const {f1 ,f2} = require('./func') //解構式

// console.log(f1(10))
// console.log(f2(10))

const {f1:func1 ,f2} = require('./func') //建構式給它名稱

console.log(func1(10))
console.log(f2(10))



const Employee = require('./employee')

const em = new Employee('A002', 'Bill', 25)

console.log('' + em) //('' + em.toString())
console.log(em.toJSON())
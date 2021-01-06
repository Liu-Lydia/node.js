const Person = require("./person");


//繼承使用extends super宣告
class Employee extends Person {
  //constructor有等於是要定義預設值
  constructor(id, name = "nonename", age = "20") {
    super(name, age);
    this.employee_id = id;
  }


  toString() {
    return JSON.stringify(this.toJSON());
  }

  
  toJSON(){
        const obj = super.toJSON();
        obj.employee_id = this.employee_id
        return obj

    //   return {
    //       name: this.name,
    //       age: this.age,
    //       employee_id: this.employee_id,
    //   }
  }
}
module.exports = Employee;

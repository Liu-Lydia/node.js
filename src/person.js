class Person {
    //類別屬性不需要宣告const
    //建構函式 function
    constructor(name='nonename', age='20'){
        this.name = name;
        this.age = age;
    }
    //物件轉換成JSON
    toJSON(){
        return {
            name: this.name,
            age: this.age,
        }

        // return JSON.stringify({
        //     name: this.name,
        //     age: this.age,
        // })
    }
    //通常不這樣用
    aaa = () => {
        return 123;
    }
}
//匯出類別
module.exports = Person;

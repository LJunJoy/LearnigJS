function Person() { }
Person.prototype.name = 'Zaxlct';
Person.prototype.age = 28;
Person.prototype.job = 'Software Engineer';
Person.prototype.sayName = function () {
    console.log(this.name);
}

var person1 = new Person();
person1.sayName(); // 'Zaxlct'

var person2 = new Person();
person2.sayName(); // 'Zaxlct'

console.log(person1.sayName == person2.sayName); //true

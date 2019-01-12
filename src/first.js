function Person() { }
Person.prototype.name = 'Zaxlct';
Person.prototype.age = 28;
Person.prototype.job = 'Software Engineer';
Person.prototype.sayName = function () {
    console.log(this.name);
}

function print16(chicun){
    var c=chicun*2.54;
    var cb=Math.sqrt(16*16+9*9);
    console.log(c);
    var a=c*16/cb;
    var b=c*9/cb;
    console.log(a+":"+b);

    console.log();
}

var scope="global";
function checkScope(){
    console.log(scope);
    var scope="local";
    console.log(scope);
}
checkScope();


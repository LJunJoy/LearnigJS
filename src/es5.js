function Person() { }
Person.prototype.name = 'Zaxlct';
Person.prototype.age = 28;
Person.prototype.job = 'Software Engineer';
Person.prototype.sayName = function () {
    console.log(this.name);
}

function checkNullEqual(){
    console.log(null===null);
    console.log(undefined===undefined);
    console.log(NaN===NaN);
    console.log(null==undefined);
}

function checkDelete(){
    var arr=['a','b','c'];
    console.log(arr,'before delete: arr','0' in arr,'a is in arr');
    delete arr[0];
    console.log(arr,'after delete: arr','0' in arr,'a is in arr');
    
    var aobj={
        'a':'aa',
        b:'bb',
        c:'cc'
    };    
    console.log(aobj,'before delete: aobj','a' in aobj,'a is in aobj');
    console.log(aobj.hasOwnProperty('a'));
    delete aobj.a;
    console.log(aobj,'after delete: aobj','a' in aobj,'a is in aobj');
    console.log(aobj.hasOwnProperty('a'));
    // [ 'a', 'b', 'c' ] 'before delete: arr' true 'a is in arr'
    // [ <1 empty item>, 'b', 'c' ] 'after delete: arr' false 'a is in arr'
    // { a: 'aa', b: 'bb', c: 'cc' } 'before delete: aobj' true 'a is in aobj'
    // { b: 'bb', c: 'cc' } 'after delete: aobj' false 'a is in aobj'
}

function checkStrict(){
    'use strict'
    console.log(this===undefined);
    // throw new Error('123');
}

function checkObj(){
    var obj={
        a:"aa",
        b:"bb",
        c:"cc",
        'd':"dd"
    };
    var obj2=new Person();
    for(var i in obj){
        if(obj.hasOwnProperty(i)){
            console.log(i,obj[i]) // 直接用obj.i报错，会当作obj['i']
        }
    }
    delete obj.a;
    for(var i in obj){
        if(obj.hasOwnProperty(i)){
            console.log(i,obj[i])
        }
    }
}

function extend(o,p){
    for(prop in p){
        o[prop]=p[prop]; // 对ie中的部分原生对象不安全
    }
}

function compareStringIgnoreCase(s,t){
    var a = s.toLowerCase();
    var b = t.toLowerCase();
    if(a<b) return -1;
    if(a>b) return 1;
    return 0;
}

function checkArray(){
    var arr=[,,,];
    console.log(arr.length,"length",0 in arr,"0 in arr");
    var arr2=[undefined,];
    console.log(arr2.length,"length",0 in arr2,"0 in arr2");

    for(var i=0;i<3;i++){
        arr[i]=i*10+"a";        
    }
    console.log(arr);
    console.log(arr.join("-")); // String.split() 的逆操作
    console.log(arr.reverse().join("-"));
    console.log(arr,"before sort",arr.reverse().sort(),"after reverse and sort");
    console.log(arr,"before sort",arr.sort(compareStringIgnoreCase),"after my own sort");
    //遍历数组
    for(var i in arr){
        // 不存在的索引会自动过滤掉
        // 注意，for in会遍历到继承的属性，例如添加到Array.prototype的方法，因此不建议用for in遍历数组，除非注意过滤
        if(!arr.hasOwnProperty(i)) { // 过滤掉继承的属性，对对象来说（数组是特殊的对象）
            console.log(i,arr[i]);
        }
    }
    for(var i in Object.keys(arr)){
        console.log(arr[i]);// 错误，for遍历数组时index始终是下标，而这里显然keys[i]才是正常的arr的下标
    }
    // 推荐做法一：
    for(var i=0;i<arr.length;i++){
        console.log(arr[i]);
    }
    // 推荐做法二：
    // Object.keys()用于获取对象(包括数组)自身所有的可枚举的属性值，但不包括原型中的属性（避免了for in的问题），
    // 然后返回属性名组成的数组。注意它同for..in一样不能保证属性按对象原来的顺序输出。
    var keys=Object.keys(arr);
    for(var i=0,len=keys.length;i<len;i++){ // 在性能非常重要的场合可以使下标只查询一次
        // if(!arr[i]) // 排除稀疏数组的null、undefined、不存在的元素
        console.log(arr[keys[i]]);
    }

    var barr;
    barr=arr.concat(1,2); // concat总是会返回一个新的数组
    console.log(barr);
    barr=arr.concat(1,2,[11,12]); // 遇到数组时展开元素
    console.log(barr);
    barr=arr.concat(1,2,[11,[111,112]]); // 但并不展开数组的数组
    console.log(barr);
    // [ '0a', '10a', '20a', 1, 2 ]
    // [ '0a', '10a', '20a', 1, 2, 11, 12 ]
    // [ '0a', '10a', '20a', 1, 2, 11, [ 111, 112 ] ]
    
    var carr=[1,2,3,4,5,6,7,8,9];
    console.log(carr.slice(1,2)); // slice截取数组的一部分[start,end)并返回，不修改原数组
    console.log(carr.slice(1)); // 只输入一个参数时取到数组末尾，支持负数反向计数
    console.log(carr.splice(1,2),carr); // splice删除数组的一部分[start,count]并返回删除的部分，修改原数组（剩下元素索引仍连续）
    console.log(carr.splice(5),carr); // 省略第2个参数时删除到数组末尾，同样支持负数反向计数
    console.log(carr.splice(1,2,30,40,50),carr); // 从第3个参数开始的元素插入删除的位置，区别于concat，元素为数组时会直接插入数组
    // push和pop直接在原数组上插入或删除，在数组末尾操作，并相应修改数组长度
    carr.push(10);
    console.log(carr);
    console.log(carr.pop(),carr);
    // shift和unshift直接在原数组上删除或插入，在数组头部操作，并相应修改数组长度（移走一个元素，其余元素会移动过来填充）
    console.log(carr.shift(),carr);
    console.log(carr.unshift(11),carr);
    console.log(carr.unshift(12,[13,14],15),carr);// 插入多个元素时是一次插入，直接“粘贴”到数组头部

    // es5 提供的数组方法：基本形式是 arr.func( function(item,index,arr){} )，对数组元素依次调用function，其中index和arr可不使用，且都不修改原数组
    var darr=[10,20,30,40,50];
    // Array.prototype.testFunc = function(){console.log('haha')};
    // for(var ii in darr){
    //     console.log(ii,darr[ii]);
    // }

    var sum=0;
    darr.forEach((item)=>{ sum+=item; }); // 只会遍历数组本身的元素，没有for in的问题
    console.log(sum);
    
    sum=0;
    var earr=darr.map((item)=>{ return sum+=item; }); // map和forEach方法相似但必须要返回值，这些值会组成新的数组，和原数组长度、稀疏程度一样
    console.log(earr,darr);

    farr=darr.filter((item)=>{ return item%20==0; }); // filter根据function是否返回true来过滤元素，注意它本身就会忽略掉不存在的元素，返回的数组总是稠密的
    console.log(farr);
    delete darr['0'];
    farr=darr.filter((item)=>{ return item!==undefined && item!=null; }); // 去掉不存在的、为undefined的、为null的元素
    console.log(farr,darr);
    
    darr['0'] = 10;
    var flag=darr.every((item)=>{ return item%20==0; });
    console.log(flag);
    flag=darr.some((item)=>{ return item%20==0; });
    console.log(flag);
    
    var garr=[1,2,3,4,5,];
    // reduce作用是依次处理相邻的两个元素直到处理完所有元素，第1个参数为处理函数，第2个参数为可选的初始值，不写时为遍历时的第一个元素
    sum=garr.reduce(function(x,y){ return x+y;}, 0);
    console.log(sum); // 15
    sum=garr.reduceRight(function(x,y){ return x-y;}, sum); // reduceRight遍历方向和reduce相反
    console.log(sum); // 0
    
    // 警告：除了forEach外其他es5的数组方法几乎都要return，不加上则返回默认的undefined，可能引起微妙的错误，例如上面的every和some都会为false！

    console.log(garr.indexOf(2)); // 查找此元素值第一次出现的下标，没有找到返回-1
    console.log(garr.lastIndexOf(2)); // 反向查找
}

// 作用域：一个变量的作用域是程序源代码定义这个变量的区域，在这个区域内变量有效。也即，变量（包括函数）的作用域是在代码编译时就确定了，跟运行时无关！虽然可以修改上下文！
var globalOrLocal="global";
function checkScope(){
    var globalOrLocal="checkBiBao";
    // 如果不加var可能会产生微妙的错误：首先在本作用域查找，再递归的在父作用域查找，能找到则修改它的值，找不到时则在全局作用域新声明该变量（不在函数内声明的变量都是全局变量）
    // 因此新声明变量必须加var，并且在同一作用域重复的声明是无害的，变量声明会提升到该作用域顶部（但定义赋值的动作不会提升，即定义前使用时值为undefined）    
    function testNewArray(){
        var result=[];
        console.log(i); // 由于声明提升，不会报不存在该变量的错误，值为undefined
        for(var i=0;i<5;i++){ // 这里声明并定义的i在整个testNewArray作用域都是有效的
            var data=[i]; // 这里虽然只声明了一次data，由于[]在语法上相当于new Array，每次都是新的引用，添加到result中是没问题的
            result.push(data);
        }
        console.log("testNewArray: ", result); // [ [ 0 ], [ 1 ], [ 2 ], [ 3 ], [ 4 ] ]
    }
    function nested(){
        var globalOrLocal="nested";
        return globalOrLocal;
    }
    testNewArray();
    return nested();
}
// console.log(checkScope());
// console.log(globalOrLocal); // 由于checkScope和nested()访问的是自己声明的变量，因此不影响全局的同名变量

// 函数的执行依赖于记法作用域，根据作用域的定义，在函数定义时就决定了作用域，为了实现这种约束，javascript函数对象的内部状态不仅包含代码逻辑，
// 还必须引用当前的作用域链。函数对象可以通过作用域链关联，函数体内的变量可以保存在函数作用域内，这种特性被称为闭包。
// 当定义一个函数时，它实际上新建一个作用域链(可理解为一个保存属性的对象)，没有嵌套函数的函数作用域有两个：函数作用域和全局作用域
// 而有嵌套函数时，每次调用外部函数时作用域链对嵌套函数的引用都会被修改（像是重新定义一般）
var globalOrLocal="global";
function checkScopeChain(){
    var globalOrLocal="local";
    function f(){ return globalOrLocal; } 
    return f; // 返回了嵌套函数，而该嵌套函数还访问了外部函数的属性，因此即使外部函数调用结束了，该属性也不会回收，这就是闭包的效果
    // 理解的关键在于，函数作用域会被单独的对象保存，函数退出后其中的变量内存不一定就会被回收，还要看有没有被外部引用
}
// console.log(checkScopeChain()());
function testFunction(a,b){ console.log("testFunction: ", this, a, b); }
function testFunction2(a,b){ console.log("testFunction2: ", this, a, b); }
function checkFunction(){
    testFunction.prototype.name={aa:"cmbchina"};
    var testFunctionObj1=new testFunction();
    var testFunctionObj2=new testFunction; // 没有形参时可以省略括号
    console.log(testFunction.prototype); // 每个function都有一个原型对象，类型为{}，当将函数用作构造函数时，创建的对象会从原型对象上继承属性（即共享之）
    console.log(testFunctionObj1.name,testFunctionObj2.name); // 都是 { aa: 'cmbchina' }
    testFunctionObj1.name.aa="";
    console.log(testFunctionObj1.name,testFunctionObj2.name); // 都是 { aa: '' }

    // call和apply方法的作用是修改函数执行时的this上下文，第1个参数都是新的this，其余参数为传给函数形参的参数，区别在于apply以数组形式传入其余参数
    // f.call(o)和f.apply(o) 等价于 o.m=f;o.m();delete o.m;
    var testFunction2Obj = new testFunction2();
    testFunction.call(testFunction2Obj, 10, 20); // testFunction:  testFunction2 {} 10 20
    testFunction.apply(testFunction2Obj, [30, 40]);

    // bind方法作用是绑定函数执行时的this上下文，第1个参数为要使用的this对象，其余参数则绑定到函数形参（可选），然后调用时还可以再传入剩余形参
    var sum = function(y,z){ return this.x+y+z; }
    var succ=sum.bind({x:1},2);
    console.log(succ(3)); // 1+2+3
    // es3模拟bind
    function es3bind(f,o){
        if(f.bind) return f.bind(o);
        else return function(){
            return f.apply(o,arguments);
        }
    }
    var succ2=es3bind(sum,{x:1});
    console.log(succ2(2,3)); // 1+2+3
}

checkFunction();
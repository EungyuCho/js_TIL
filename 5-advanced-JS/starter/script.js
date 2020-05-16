// function constructor

// 객체 생성
/*
let date = new Date();
function hello(){

}

console.log(hello);
new hello();
var john = {
    name: 'John',
    yearOfBirth: 1990,
    job: 'teacher'
}

//Person 객체 정의
//함수(function) 정의 시 prototype속성을 갖고 함께 Prototype Object도 같이 생성시켜준다.
//function 정의 시 prototype속성을 통해 Prototype Object에 접근할 수 있다.

var Person = function(name, yearOfBirth, job){
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job
    this.greeting = function(){
        console.log('Hi! My name is ' + this.name);
    }
}
//prototype을 이용해서 prototype Object에 속성을 추가할 수 있다.
Person.prototype.lastName = 'Smith';

Person.prototype.calculateAge = function(){
    this.calculate = function(){
        console.log(new Date().getFullYear() - this.yearOfBirth);
    }
}



const mina = new Person('Mina', 1995, 'programmer');
const jane = new Person('Jane', 1964, 'designer');
const mark = new Person('Mark', 1948, 'retired');

jane.greeting();
mark.greeting();
mark.calculateAge();
console.log(jane.lastName);

//__proto__는 객체가 새로 생성 될 때 조상이었던 함수(Person)의 Prototype Object를 가르킨다!
console.log(Object.getPrototypeOf(mark));

*/

/*

// Primitive : call by value
var a = 23;
var b = a;
a = 46;

console.log(a);
console.log(b);

// Objects : call by reference
var obj1 = {
    name: 'john',
    age : 26
}
var obj2 = obj1;
obj2.age = 30;

console.log(obj1.age);
console.log(obj2.age);

//Functions
var age = 27;
var obj = {
    name : 'jonas',
    city : 'risbon'
};

function change(a,b){
    a = 30;
    b.city = 'San Francisco'
}

change(age, obj);

console.log(age);       //원시값이므로 함수에서 값을 전달받았을뿐이기때문에 a는 바뀌지않음
console.log(obj.city);  //값에대한 주소를 넘겨주므로 데이터가 변경되었다!!
*/

/////////////////////////////
// Lecture: Passing functions as arguments


var years = [1990, 1965, 1937, 2005, 1998];

//배열을 돌면서 함수를 인자로 받아서 함수를 실행한 결과를 새로운 배열에 추가해주고 loop가 끝나면 리턴해줌
function arrayCalc(arr, fn){
    var arrRes = [];
    for(var i = 0; i < arr.length; i++){
        arrRes.push(fn(arr[i]));
    }
    return arrRes;
}
//Call back functions

function calculateAge(el){
    return new Date().getFullYear() - el;
}

function isFullAge(el) {
    return el >= 18;
}

function maxHeartRate(el) {
    if (el >= 18 && el <= 81) {
        return Math.round(206.9 - (0.67 * el));
    } else {
        return -1;
    }
}


var ages = arrayCalc(years, calculateAge);
var fullAges = arrayCalc(ages, isFullAge);
var rates = arrayCalc(ages, maxHeartRate);

console.log(ages.toString());
console.log(fullAges.toString());
console.log(rates.toString());



/////////////////////////////
// Lecture: Functions returning functions

function interviewQuestion(job) {
    if (job === 'designer') {
        return function(name) {
            console.log(name + ', can you please explain what UX design is?');
        }
    } else if (job === 'teacher') {
        return function(name) {
            console.log('What subject do you teach, ' + name + '?');
        }
    } else {
        return function(name) {
            console.log('Hello ' + name + ', what do you do?');
        }
    }
}
//리턴한 함수를 할당받음
var teacherQuestion = interviewQuestion('teacher');     
var designerQuestion = interviewQuestion('designer');
var unknownQuestion = interviewQuestion('unknown');

teacherQuestion('John');
designerQuestion('John');
designerQuestion('jane');
designerQuestion('Mark');
designerQuestion('Mike');
unknownQuestion('Sara');

console.log(teacherQuestion.toString());  // function(name) { console.log('What subject do you teach, ' + name + '?'); }
console.log(designerQuestion.toString()); // function(name) { console.log(name + ', can you please explain what UX design is?'); }
console.log(unknownQuestion.toString()); // function(name) { console.log(name + ', can you please explain what UX design is?'); }

interviewQuestion('teacher')('Mark');


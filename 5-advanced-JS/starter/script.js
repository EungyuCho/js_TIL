// function constructor
// 객체 생성
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
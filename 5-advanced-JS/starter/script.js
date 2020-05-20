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
/*

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

*/

/////////////////////////////////
// Lecture : IIFE
/*
function game(){
    var score = Math.random() * 10;
    console.log(score >= 5);
}
game();
*/
// 데이터가 안전함(즉시 실행이므로 데이터가 노출되지 않음.)

/*
(function(){
    var score = Math.random() * 10;
    console.log(score >= 5);
})();

(function(goodLuck){
    var score = Math.random() * 10;
    console.log(score >= 5 - goodLuck);
    })(5);

*/
/////////////////////////////////
// Lecture : Closures
// 클로저는 함수의 선언 위치에 따라서 결정되는 렉시컬 스코핑에서 외부함수가 내부함수보다 더 오래
// 유지되는 경우 외부함수 밖에서 내부함수가 호출 되더라도 외부함수의 지역변수(a)에 접근할 수 있다.
/*
function retirement(retirementAge){
    var a = ' years left until retirement.';
    return function(yearOfBirth){
        var age = new Date().getFullYear() - yearOfBirth;
        console.log((retirementAge - age) + a);     //함수 스코프 밖에 a가 있지만 참조할 수 있음
    }
}

var retirementUS = retirement(66);
var retirementGermany = retirement(65);
var retirementIceland = retirement(67);

retirementGermany(1990);
retirementUS(1990);
retirementIceland(1990);

// function interviewQuestion(job) {
//     if (job === 'designer') {
//         return function(name) {
//             console.log(name + ', can you please explain what UX design is?');
//         }
//     } else if (job === 'teacher') {
//         return function(name) {
//             console.log('What subject do you teach, ' + name + '?');
//         }
//     } else {
//         return function(name) {
//             console.log('Hello ' + name + ', what do you do?');
//         }
//     }
// }


function interviewQuestion(job){
    return function(name){
        switch(job){
            case 'designer':
                console.log(name + ', can you please explain what UX design is?');
                break;
            case 'teacher':
                console.log('What subject do you teach, ' + name + '?');
                break;
            default:
                console.log('Hello ' + name + ', what do you do?');
                break;
        }
    }
}


var design = interviewQuestion('designer');
var teacher = interviewQuestion('teacher');
var programmer = interviewQuestion('programmer');

design('mina');
teacher('minsu');
programmer('robot');
*/



/////////////////////////////////
// Lecture : Bind, call and apply

/*

var john = {
    name : 'john',
    age : 26,
    job : 'teacher',
    presentation: function(style, timeOfDay){
        if(style === 'fomal'){
            console.log('Good ' + timeOfDay + ', Ladies and gentlemen! I\'m ' 
            + this.name + ', I\'m a ' + this.job + ' and I\'m '+this.age +'years old.');
        }else if(style === 'friendly'){
            console.log('Hey! What\'s up? I\'m ' + this.name + ', I\'m a ' + this.job + 'and I\'m '
            +this.age +'years old. Have a nice ' + timeOfDay +'.');
        }
    }
}

var emily = {
    name : 'emily',
    age : 35,
    job : 'designer',

}

john.presentation('fomal', 'morning');
john.presentation.call(emily, 'friendly', 'afternoon');     //call은 인자를 하나씩 넣어서 호출

//john.presentation.apply(emily, ['friendly', 'afternoon']);    // apply는 인자를 배열형태로 넣어줌

var johnFriendly = john.presentation.bind(john, 'friendly');    //bind는 호출하지않고 인수를 할당만해줌

johnFriendly('morning');

var emilyFormal = john.presentation.bind(emily, 'fomal');

emilyFormal('night');


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

function isFullAge(limit, el) {
    return el >= limit;
}

var ages = arrayCalc(years, calculateAge);

var fullJapan = arrayCalc(ages, isFullAge.bind(this, 20));

console.log(ages);
console.log(fullJapan);

*/

/*
--- Let's build a fun quiz game in the console! ---

1. Build a function constructor called Question to describe a question. A question should include:
a) question itself
b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
c) correct answer (I would use a number for this)

2. Create a couple of questions using the constructor

3. Store them all inside an array

4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).

5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.

6. Check if the answer is correct and print to the console whether the answer is correct ot nor (Hint: write another method for this).

7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and doesn't interfere with the other programmers code (Hint: we learned a special technique to do exactly that).
*/


(function(){
    var score = 0;
    function Question(question, answers, correct) {
        this.score = score;
        this.question = question;
        this.answers = answers;
        this.correct = correct;
    }
    
    Question.prototype.displayQuestion = function () {
        console.log(this.question);

        for (var i = 0; i < this.answers.length; i++) {
            console.log(i + ': ' + this.answers[i]);
        }
    }

    Question.prototype.displayScore = function () {
        console.log('Your current score is: ' + score);
        console.log('=================================');
    }
    Question.prototype.checkAnswer = function(ans) {
        console.log('ans는 '+ans);
        if (ans === this.correct) {
            console.log('Correct answer!');
            score += 2;
            gameStart();
        } else if(ans === undefined){
            console.log('game end!');    
        }else {
            console.log('Wrong answer. Try again :)');
            gameStart();

        }
    }

    var q1 = new Question('Is JavaScript the coolest programming language in the world?',
                          ['Yes', 'No'],
                          0);

    var q2 = new Question('What is the name of this course\'s teacher?',
                          ['John', 'Micheal', 'Jonas'],
                          2);

    var q3 = new Question('What does best describe coding?',
                          ['Boring', 'Hard', 'Fun', 'Tediuos'],
                          2);

    var questions = [q1, q2, q3];

    var n;

    var gameStart = function(){
        n = Math.floor(Math.random() * questions.length);
    
        questions[n].displayQuestion();
    
        var answer = parseInt(prompt('Please select the correct answer.'));
    
        if(answer !== 'exit'){
            questions[n].checkAnswer(answer);
            gameStart();
        }
    }

    gameStart();
})();

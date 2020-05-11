///////////////////////////////////////
// Lecture: Hoisting
/* 
    호이스팅이란 함수안에 있는 선언을 끌어올려서 해당 함수 유효범위 최상단에 선언하는것이다.
    var과 함수선언문에서만 호이스팅이 일어난다.
    호이스팅 우선순위는 var변수선언이 최상단이며, 함수선언이 그 이후에 호이스팅이된다,
    let, const를 쓰면 호이스팅으로 인한 스코프 꼬임을 방지할 수 있다.
*/
calculateAge(1965);     //53

function calculateAge(year){
    console.log(2016- year);
}


// retirement(1990);  // is not a function

var retirement = function(year) {
    console.log(65 - (2016 - year));  
}

retirement(1990);  // 39
//variables

console.log(age);       //undefined
var age = 23;
console.log(age);       //23


function foo(){
    console.log(age);    //undefined
    var age = 65;
    console.log(age);    //65
}

foo();
console.log(age);       //23


// printName(); // > TypeError: inner is not a function
///////////////////////////////////////
// Lecture: Scoping


// First scoping example

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}
*/



// Example to show the differece between execution stack and scope chain

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
}

function third() {
    var d = 'John';
    console.log(a + b + c + d);
}
*/



///////////////////////////////////////
// Lecture: The this keyword










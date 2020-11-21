/*
//Function constructor

var john = {
    name: 'john',
    yearOfBirth: 1990,
    job: 'teacher'
};

var Person = function (name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
};

Person.prototype.lastName = 'Smith';
Person.prototype.calculateAge = function () {
    console.log(2020 - this.yearOfBirth);
}

var john = new Person('john', 1990, 'teacher');
var jane = new Person('Jane', 1969, 'designer');
var mark = new Person('Mark', 1948, 'retired');

john.calculateAge();
jane.calculateAge();
mark.calculateAge();

console.log(john.lastName);
console.log(jane.lastName);
*/

/*
// Primitives vs objects

// Primitives
var a = 23;
var b = a;
a = 46;
console.log(a);
console.log(b);


// Objects
var obj1 = {
    name: 'John',
    age: 26
}

var obj2 = obj1;

obj1.age = 30;
console.log(obj1.age);
console.log(obj2.age);

// Functions
var age = 27;
var obj = {
    name: 'Jonas',
    city: 'Lisbon',
};

function change(a, b) {
    a = 30;
    b.city = 'San Francisco'
}

change(age, obj);

console.log(age);
console.log(obj.city);
*/

/*
///////////////////////////////
// Lectures : Passing functions as arguments

var years = [1990, 1965, 1937, 2005, 1998];

function arrayCalc(arr, fn) {
    var arrResult = [];
    for (var i = 0; i < arr.length; i++) {
        arrResult.push(fn(arr[i]));
    }

    return arrResult;
}

function calculateAge(el) {
    return 2020 - el;
}

function isFullAge(el) {
    return el >= 18;
}

function maxHeartRate(el) {
    if (el >= 18 && el <= 81)
        return Math.round(206.9 - (0.67 * el));

    return -1;
}

var ages = arrayCalc(years, calculateAge);
var fullAges = arrayCalc(ages, isFullAge);
var rates = arrayCalc(ages, maxHeartRate);
console.log(ages);
console.log(fullAges);
console.log(rates);
*/

///////////////////////////////////////
//// Lecture : Functions returning functions

function interviewQuestion(job) {
    if (job === 'designer') {
        return (name) => {
            console.log(name + ', can you please explain what UX design is?');
        }
    } else if (job === 'teacher') {
        return (name) => {
            console.log('What subject do you teach, ' + name + '?');
        };
    } else {
        return (name) => {
            console.log('Hello ' + name + ', what do you do?');
        }
    }
}

var teacherQuestion = interviewQuestion('teacher');
var designerQuestion = interviewQuestion('designer');
teacherQuestion('John');
designerQuestion('jane');
designerQuestion('Mark');
interviewQuestion('teacher')('Mike');

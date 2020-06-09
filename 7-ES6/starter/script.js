// Arrow functions

const years = [1995, 1965, 1982, 1937]

//ES5
var ages5 = years.map(function (el) {
    return 2020 - el;
});

// console.log(ages5);

//ES6

let ages6 = years.map(el => 2020 - el);
console.log(ages6);

ages6 = years.map((el, index) => `Age element ${index + 1}: ${2016 - el}.`);
console.log(ages6);

ages6 = years.map((el, index) => {
    const now = new
    Date().getFullYear();
    const age = now - el;
    return `Age element ${index + 1}:${age}`
});

// console.log(ages6);

//Arrow functions2

//ES5

var box5 = {
    color: 'green',
    position: 1,
    clickMe: function () {
        var self = this;
        document.querySelector('.green' +
            '').addEventListener('click', function () {
            var str = 'This is box number ' + self.position +
                ' and it is ' + self.color;
            alert(str);
        });
    }
}

// box5.clickMe();


const box6 = {
    color: 'green',
    position: 1,
    clickMe: function () {
        document.querySelector('.green' +
            '').addEventListener('click', () => {
            var str = 'This is box number ' + this.position +
                ' and it is ' + this.color;
            alert(str);
        });
    }
}

// box6.clickMe();

/*
const box66 = {
    color: 'green',
    position: 1,
    clickMe: () => {
        document.querySelector('.green' +
            '').addEventListener('click', () => {
            var str = 'This is box number ' + this.position +
                ' and it is ' + this.color;
            alert(str);
        });
    }
}

box66.clickMe();
*/


function Person(name) {
    this.name = name;
}

//ES5
Person.prototype.myFriends5 = function (friend) {
    var arr = friend.map(function (el) {
        return this.name + ' is friends with ' + el;
    }.bind(this));
    console.log(arr)
};

var friends = ['Bob', 'Jane', 'Makr'];

// new Person('John').myFriends5(friends);

//ES6

Person.prototype.myFriends6 = function (friend) {
    const arr = friend.map(el => `${this.name} is friends with ${el}`);
    console.log(arr)
};

// new Person('John').myFriends6(friends);


//Destructuring

//ES5
var john = ['John', 26];
// var name = john[0];
// var age = john[1];
/*
//ES6
const [name, age] = ['John', 26];
console.log(name)
console.log(age)

const obj = {
    firstName: 'John',
    lastName: 'Smith'
};

const {firstName, lastName} = obj;

console.log(firstName)
console.log(lastName)

const {firstName: a, lastName: b} = obj;

console.log(a)
console.log(b)

 */
function calcAgeRetirement(year) {
    const age = new Date().getFullYear() - year;
    return [age, 65 - age];
}

const [age, retirement] = calcAgeRetirement(1990);

console.log(age)
console.log(retirement)


//Spread operator

function addFourAges(a, b, c, d) {
    return a + b + c + d;
}

var sum1 = addFourAges(18, 30, 12, 21);
console.log(sum1);


//ES5
var ages = [18, 30, 12,  21];
var sum2 = addFourAges.apply(null, ages);
console.log(sum2)

//ES6
const max3 = addFourAges(...ages);
console.log(max3);

const familySmith = ['John', 'Jane', 'Mark'];
const familyMiller = ['Mary', 'Bob', 'Ann'];
const bigFamily = [...familyMiller, ...familySmith];
console.log(bigFamily)

const h = document.querySelector('h1');
const boxes = document.querySelectorAll('.box');

console.log(h);
console.log(boxes);

const all = [h, ...boxes];
Array.from(all).forEach(cur => cur.style.color = 'purple')


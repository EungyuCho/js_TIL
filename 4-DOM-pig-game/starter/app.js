/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

function user(name, score, current){
    this.name = name;
    this.score = score;
    this.current = current;
}

const btn_new = document.getElementsByClassName('btn-new')[0];
const btn_roll = document.getElementsByClassName('btn-roll')[0];
const btn_hold = document.getElementsByClassName('btn-hold')[0];
const score1 = document.getElementById('score-0');
const score2 = document.getElementById('score-1');
const current1 = document.getElementById('current-0');
const current2 = document.getElementById('current-1');
const dice = document.getElementById('dice');
const imgArr = ['dice-1.png','dice-2.png','dice-3.png','dice-4.png','dice-5.png','dice-6.png'];
let user1 = new user('user1', score1.innerText, current1.innerText);
let user2 = new user('user2', score2.innerText, current2.innerHTML);

btn_new.addEventListener('click', function(){
    user1 = new user('user1', 0, 0);
    user2 = new user('user2', 0, 0);

    score1.innerText = 0;
    score2.innerText = 0;

    current1.innerText = 0;
    current2.innerText = 0;

    dice.style.display = 'none';
    console.log(user1);
    console.log(user2);
});

btn_roll.addEventListener('click',function(){
    dice.style.display = 'block';

    let diceValue = getRandomInt(1, 6);
    dice.src = imgArr[diceValue-1];
});

function getRandomInt(min, max) { 
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}


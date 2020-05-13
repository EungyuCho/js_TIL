/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
/**
 * 유저 정의
 * @param {String} name 
 * @param {String} score 
 * @param {String} current 
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
const panel1 = document.getElementsByClassName('player-0-panel')[0];
const panel2 = document.getElementsByClassName('player-1-panel')[0];
const name = document.getElementsByClassName('player-name');
// true : 게임 진행 중      false : 게임 승리로 인해 중지된 상태
let gamePlaying = true;
//현재 어느플레이어의 턴인지?
let acitvePlayer = 1;

// 유저 정의
let user1 = new user('user1', score1.innerText, current1.innerText);
let user2 = new user('user2', score2.innerText, current2.innerText);

// 새로 시작 클릭 시 전부 초기화
btn_new.addEventListener('click', function(){
    user1 = new user('user1', 0, 0);
    user2 = new user('user2', 0, 0);

    score1.innerText = 0;
    score2.innerText = 0;

    current1.innerText = 0;
    current2.innerText = 0;

    dice.style.display = 'none';
    const playerName = document.querySelector('#name-' + (acitvePlayer-1));
    playerName.innerText = 'player'+acitvePlayer;
    panel1.classList.remove('winner');
    panel2.classList.remove('winner');

    panel1.classList.add('active');
    panel2.classList.remove('active');

    acitvePlayer = 1;
    gamePlaying = true;

});

// 주사위 던지기 이벤트
btn_roll.addEventListener('click',function(){
    if(gamePlaying){
        dice.style.display = 'block';

        let diceValue = getRandomInt(1, 6);
        dice.src = 'dice-'+ (diceValue) +'.png';

        
        if(acitvePlayer===1){
            let current = parseInt(current1.innerText);
            user1.current = current + diceValue;
            if(diceValue===1){
                currentReset();
                changeActivePlayer();
            }
        }else if(acitvePlayer===2){
            let current = parseInt(current2.innerText);
            user2.current = current + diceValue;
            if(diceValue===1){
                currentReset();
                changeActivePlayer();
            }
        }else{
            throw new Error("turn error");
        }
        //current(현재까지 돌린 값을 업데이트 해준다.)
        currentUpdate();
        //점수가 winScore를 넘었는지 확인해서 넘었을 시 승리이벤트를 발생시킨다.
        checkWinScore();
    }
});

// 승리점수 체크 이벤트
function checkWinScore(){
    // winScore를 여기서 설정할 수 있음.
    const winScore = 100;
    let isWin = false;
    let totalScore;
    if(acitvePlayer===1){
        totalScore = (parseInt(score1.innerText) + parseInt(current1.innerText));
        isWin = totalScore >= winScore ? true : false;
        if(isWin){
            winEvent(panel1);
        }
    }else if(acitvePlayer===2){
        totalScore = (parseInt(score2.innerText) + parseInt(current2.innerText));
        isWin = totalScore >= winScore ? true : false;
        if(isWin){
            winEvent(panel2);
        }
    }else{
        throw new Error('player not found!');
    }
    console.log(totalScore);
}
// 승리 시 이벤트
function winEvent(panel){
    panel.classList.remove('active');
    panel.classList.add('winner');
    const playerName = document.querySelector('#name-' + (acitvePlayer-1));
    playerName.textContent = 'WINNER!';
    gamePlaying = false;
}
// 해당 current의 데이터를 리셋시켜준다
function currentReset(){
    if(acitvePlayer===1){
        user1.current = 0;
        current1.innerText = 0;
    }else if(acitvePlayer===2){
        user2.current = 0;
        current2.innerText = 0;
    }else{
        throw new Error('player not found!');
    }
    
}
// 홀드 버튼 클릭 시 다른플레이어의 턴으로 넘겨주고 active도 넘겨준다.
btn_hold.addEventListener('click', function(){
    if(gamePlaying){
        if(acitvePlayer===1){
            score1.innerText = parseInt(score1.innerText) +parseInt(current1.innerText);
            currentReset();
        }else if(acitvePlayer===2){
            score2.innerText = parseInt(score2.innerText) +parseInt(current2.innerText);
            currentReset();
        }else{
            throw new Error("turn error");
        }
        changeActivePlayer();
    }
}); 

//current(현재점수) 업데이트
function currentUpdate(){
    current1.innerText = user1.current;
    current2.innerText = user2.current;
}
// min 부터 max까지 랜덤한 수를 가져온다.
function getRandomInt(min, max) { 
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}

// AcitvePlayer를 변경해준다.
function changeActivePlayer(){
    if(acitvePlayer===1){
        acitvePlayer = 2;
        panel1.classList.remove('active');
        panel2.classList.add('active');
    }else if(acitvePlayer===2){
        acitvePlayer = 1;
        panel1.classList.add('active');
        panel2.classList.remove('active');
    }else{
        throw new Error("turn error");
    }
}

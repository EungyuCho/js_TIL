function Question({question, answers, correct}) {
    this.question = question;
    this.answers = answers;
    this.correct = correct;
}

Question.prototype.displayQuestion = function () {
    console.log(this.question);

    for (var i = 0; i < this.answers.length; i++) {
        console.log(i + ':' + this.answers[i]);
    }
};

Question.prototype.checkAnswer = function (ans, callback) {
    var sc;
    if (ans === this.correct) {
        console.log('Correct answer!');
        sc = callback(true);
        this.displayScore(sc);
        return;
    }

    console.log('Wrong answer!');
    sc = callback(false);
    this.displayScore(sc);
};

Question.prototype.displayScore = (score) => {
    console.log(`Your current score is: ${score}`);
    console.log('-------------------------------');
}

function score() {
    var sc = 0;
    return (correct) => {
        if (correct) {
            sc++;
        }
        return sc;
    }
}

var keepScore = score();

var q1 = new Question({
    question: 'Is JavaScript hte coolest programming language in the world?',
    answers: ['Yes', 'No'],
    correct: 0
});

var q2 = new Question({
    question: `What is the name of this course's teacher?`,
    answers: ['John', 'Micheal', 'Jonas'],
    correct: 2
});

var q3 = new Question({
    question: `What does best describe coding?`,
    answers: ['Boring', 'Hard', 'Fun', 'Tediuos'],
    correct: 2
});



var questions = [q1, q2, q3];

function nextQuestion() {
    var n = Math.floor(Math.random() * questions.length);

    questions[n].displayQuestion();

    var answer = parseInt(prompt('Plesase select the correct answer.'));

    if (answer !== 'exit') {
        questions[n].checkAnswer(answer, keepScore);

        nextQuestion();
    }
}

nextQuestion();
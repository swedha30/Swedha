let words = [];
let currentChar = "";
let score = 0;
let round = 0;
let totalRounds = 10;
let correct = 0, wrong = 0, missed = 0;
let inputReceived = false;
let timer;

function startGame() {
    words = document.getElementById("wordsInput").value.split(",");
    if (words.length === 0 || words[0] === "") {
        alert("Enter valid words!");
        return;
    }

    score = 0;
    round = 0;
    correct = wrong = missed = 0;
    document.getElementById("result").innerHTML = "";

    nextRound();
}

function nextRound() {
    if (round >= totalRounds) {
        endGame();
        return;
    }

    round++;
    inputReceived = false;

    let word = words[Math.floor(Math.random() * words.length)].trim();
    currentChar = word[Math.floor(Math.random() * word.length)];

    document.getElementById("char").innerText = currentChar;
    document.getElementById("timer").innerText = "Time: 3s";

    let timeLeft = 3;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = "Time: " + timeLeft + "s";

        if (timeLeft === 0) {
            clearInterval(timer);
            if (!inputReceived) {
                score--;
                missed++;
            }
            updateScore();
            setTimeout(nextRound, 500);
        }
    }, 1000);
}

document.addEventListener("keydown", function (e) {
    if (inputReceived) return;

    if (!currentChar) return;

    inputReceived = true;
    clearInterval(timer);

    let key = e.key.toLowerCase();

    if (key.length === 1 && key === currentChar.toLowerCase()) {
        score++;
        correct++;
    } else {
        score--;
        wrong++;
    }

    updateScore();
    setTimeout(nextRound, 500);
});

function updateScore() {
    document.getElementById("score").innerText = "Score: " + score;
}

function endGame() {
    document.getElementById("char").innerText = "";
    document.getElementById("timer").innerText = "";

    document.getElementById("result").innerHTML = `
        <h2>Game Over</h2>
        <p>Final Score: ${score}</p>
        <p>Correct: ${correct}</p>
        <p>Wrong: ${wrong}</p>
        <p>Missed: ${missed}</p>
        <button onclick="startGame()">Play Again</button>
    `;
}
var board = document.getElementById("board");
var cells = document.querySelectorAll(".cell");
var message = document.getElementById("message");
var resetBtn = document.getElementById("reset");

var currentPlayer = "X";
var gameState = ["", "", "", "", "", "", "", "", ""];

var winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWinner() {
    for (var i = 0; i < winningCombinations.length; i++) {
        var combo = winningCombinations[i];
        var a = combo[0], b = combo[1], c = combo[2];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            message.textContent = "Player " + currentPlayer + " wins!";
            combo.forEach(function (index) {
                cells[index].classList.add("winner");
            });
            board.classList.add("disabled");
            return true;
        }
    }
    if (gameState.indexOf("") === -1) {
        message.textContent = "It's a tie!";
        board.classList.add("disabled");
        return true;
    }
    return false;
}

function handleClick(event) {
    var index = event.target.dataset.index;
    if (gameState[index] !== "" || board.classList.contains("disabled")) return;

    gameState[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add(currentPlayer);

    if (!checkWinner()) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        message.textContent = "Player " + currentPlayer + "'s turn";
    }
}

function resetGame() {
    gameState = ["", "", "", "", "", "", "", "", ""];
    for (var i = 0; i < cells.length; i++) {
        cells[i].textContent = "";
        cells[i].classList.remove("X", "O", "winner");
    }
    currentPlayer = "X";
    message.textContent = "Player " + currentPlayer + "'s turn";
    board.classList.remove("disabled");
}

for (var i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", handleClick);
}

resetBtn.addEventListener("click", resetGame);

// Initialize
message.textContent = "Player " + currentPlayer + "'s turn";

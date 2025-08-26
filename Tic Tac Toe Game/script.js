const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const message = document.getElementById("message");
const resetBtn = document.getElementById("reset");

let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function checkWinner() {
    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (
            gameState[a] &&
            gameState[a] === gameState[b] &&
            gameState[a] === gameState[c]
        ) {
            message.textContent = `Player ${currentPlayer} wins!`;
            return true;
        }
    }
    if (!gameState.includes("")) {
        message.textContent = "It's a tie!";
        return true;
    }
    return false;
}

function handleClick(e) {
    const index = e.target.dataset.index;
    if (gameState[index] !== "" || message.textContent.includes("wins") || message.textContent.includes("tie")) return;

    gameState[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (!checkWinner()) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        message.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function resetGame() {
    gameState.fill("");
    cells.forEach(cell => (cell.textContent = ""));
    currentPlayer = "X";
    message.textContent = `Player ${currentPlayer}'s turn`;
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
resetBtn.addEventListener("click", resetGame);

// Initialize message
message.textContent = `Player ${currentPlayer}'s turn`;

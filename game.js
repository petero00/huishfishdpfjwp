const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart');
let currentPlayer = '〇';
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(e) {
    const clickedCell = e.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    if (checkWin()) {
        message.textContent = currentPlayer + 'の勝ち！';
        gameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        message.textContent = '引き分け！';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === '〇' ? '✕' : '〇';
    message.textContent = currentPlayer + 'の番です';
}

function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(index => gameState[index] === currentPlayer);
    });
}

function restartGame() {
    currentPlayer = '〇';
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    message.textContent = currentPlayer + 'の番です';
    cells.forEach(cell => cell.textContent = "");
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);

let currentPlayer = "X";
let gameEnded = false;
const board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
];
const cells = document.getElementsByClassName("cell");
const resultDiv = document.getElementById("result");
const musicToggleBtn = document.getElementById("music-toggle");
const backgroundMusic = document.getElementById("background-music");

function makeMove(row, col) {
  if (!gameEnded && board[row][col] === "") {
    board[row][col] = currentPlayer;
    cells[row * 3 + col].innerHTML = currentPlayer;
    cells[row * 3 + col].classList.add(currentPlayer);

    if (checkWinCondition(currentPlayer)) {
      announceWinner(currentPlayer);
      gameEnded = true;
    } else if (checkDraw()) {
      announceDraw();
      gameEnded = true;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }
}

function checkWinCondition(player) {
  const winConditions = [
    [[0, 0], [0, 1], [0, 2]], // горизонтальная 1
    [[1, 0], [1, 1], [1, 2]], // горизонтальная 2
    [[2, 0], [2, 1], [2, 2]], // горизонтальная 3
    [[0, 0], [1, 0], [2, 0]], // вертикальная 1
    [[0, 1], [1, 1], [2, 1]], // вертикальная 2
    [[0, 2], [1, 2], [2, 2]], // вертикальная 3
    [[0, 0], [1, 1], [2, 2]], // диагональ 1
    [[0, 2], [1, 1], [2, 0]] // диагональ 2
  ];

  for (let condition of winConditions) {
    if (
      board[condition[0][0]][condition[0][1]] === player &&
      board[condition[1][0]][condition[1][1]] === player &&
      board[condition[2][0]][condition[2][1]] === player
    ) {
      highlightWinningCells(condition);
      return true;
    }
  }

  return false;
}

function highlightWinningCells(cellsToHighlight) {
  for (let cell of cellsToHighlight) {
    const [row, col] = cell;
    cells[row * 3 + col].classList.add("win");
  }
}

function checkDraw() {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === "") {
        return false;
      }
    }
  }
  return true;
}

function announceWinner(player) {
  resultDiv.innerHTML = `Игрок ${player} победил!`;
}

function announceDraw() {
  resultDiv.innerHTML = "Ничья!";
}

function resetGame() {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      board[row][col] = "";
      cells[row * 3 + col].innerHTML = "";
      cells[row * 3 + col].classList.remove("X", "O", "win");
    }
  }
  currentPlayer = "X";
  gameEnded = false;
  resultDiv.innerHTML = "";
}

function toggleMusic() {
  if (backgroundMusic.paused) {
    backgroundMusic.play();
    musicToggleBtn.innerHTML = "Выключить музыку";
    musicToggleBtn.classList.add("music-on");
  } else {
    backgroundMusic.pause();
    musicToggleBtn.innerHTML = "Включить музыку";
    musicToggleBtn.classList.remove("music-on");
  }
}

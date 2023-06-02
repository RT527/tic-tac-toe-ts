/*-------------------------------- Constants --------------------------------*/
const winningCombos: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

/*---------------------------- Variables (state) ----------------------------*/
let turn: number, board: (number | null)[], winner: boolean, tie: boolean;

/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr') as NodeListOf<HTMLDivElement>;
const messageEl = document.querySelector('#message') as HTMLDivElement;
const boardEl = document.querySelector('.board') as HTMLDivElement;
const resetBtnEl = document.getElementById("btn") as HTMLButtonElement;

console.log(squareEls);
console.log(messageEl);

/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach(square => {
  square.addEventListener('click', handleClick);
});

resetBtnEl.addEventListener('click', init);

/*-------------------------------- Functions --------------------------------*/

function init() {
  board = [null, null, null, null, null, null, null, null, null];
  turn = 1;
  winner = false;
  tie = false;
  render();
}

init();

function render() {
  updateBoard();
  updateMessage();
}

function updateBoard() {
  board.forEach(function (square, idx) {
    if (square === null) {
      squareEls[idx].textContent = " ";
    }
    if (square === 1) {
      squareEls[idx].textContent = "🐕";
    }
    if (square === -1) {
      squareEls[idx].textContent = "🧑🏼‍🦰";
    }
  });
}

function updateMessage() {
  if (!winner && !tie) {
    messageEl.textContent = `It's ${turn === 1 ? "🐕 Scooby" : "🧑🏼‍🦰 Shaggy"}'s turn!`;
  } else if (!winner && tie === true) {
    messageEl.textContent = "Zoinks! It's a tie game, try again for a Scooby Snack?";
  } else {
    messageEl.textContent = `${turn === 1 ? "🐕 Scooby Doo" : "🧑🏼‍🦰 Shaggy"} wins!!!`;
  }
}

function handleClick(evt: MouseEvent) {
  const sqIdx = Number(evt.target!.id.replace("sq", ""));
  if (board[sqIdx] || winner) return;
  placePiece(sqIdx);
  checkForTie();
  checkForWinner();
  switchPlayerTurn();
  render();
}

function placePiece(idx: number) {
  board[idx] = turn;
}

function checkForTie() {
  if (!board.includes(null)) {
    tie = true;
  }
}

function checkForWinner() {
  winningCombos.forEach(function (combo) {
    if (Math.abs(board[combo[0]] + board[combo[1]] + board[combo[2]]) == 3) {
      winner = true;
    }
  });
}

function switchPlayerTurn() {
  if (winner) return;
  turn *= -1;
}

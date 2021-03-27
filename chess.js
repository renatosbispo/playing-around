const ROWS = 8;
const COLS = 8;
const EMPTY_SQUARE = 'O';
const QUEEN = '*';
var chessBoard = [];

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function initializeBoard() {
  for (let rowIndex = 0; rowIndex < ROWS; rowIndex += 1) {
    chessBoard[rowIndex] = [];
    for (let colIndex = 0; colIndex < COLS; colIndex += 1) {
      chessBoard[rowIndex][colIndex] = EMPTY_SQUARE;
    }
  }
}

function printBoard() {
  for (rowIndex = 0; rowIndex < ROWS; rowIndex += 1) {
    let row = '';
    for (colIndex = 0; colIndex < COLS; colIndex += 1) {
      row += chessBoard[rowIndex][colIndex];
      if (colIndex < COLS - 1) {
        row += ' ';
      }
    }
    console.log(row);
  }
}

initializeBoard();
console.clear();
for (let index = 0; index < ROWS; index += 1) {
  if (index > 0) {
    chessBoard[index - 1][index - 1] = EMPTY_SQUARE;
  }
  chessBoard[index][index] = QUEEN;
  printBoard();
  sleep(750);
  console.clear();
}
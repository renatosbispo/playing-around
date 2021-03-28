/* !!!! WARNING !!!! */
/* THIS SCRIPT WAS MEANT TO BE EXECUTED FROM THE COMMAND LINE */
/* AVOID RUNNING THIS SCRIPT IN A BROWSER, SEE SOURCE FOR THE sleep() FUNCTION FOR MORE INFO */
const prompt = require('prompt-sync')();
const colors = require('colors/safe');
const { log } = require('winston');

colors.setTheme({
  piece: ['cyan', 'bold', 'underline'],
  normalText: ['brightCyan', 'bold'],
  textHighlight: ['black', 'bold', 'bgCyan'],
  warning: ['red', 'bold', 'underline'],
  option: ['green', 'bold'],
});

const UP_KEY = colors.option('(W)');
const UP_RIGHT_KEY = colors.option('(E)');
const RIGHT_KEY = colors.option('(D)');
const DOWN_RIGHT_KEY = colors.option('(C)');
const DOWN_KEY = colors.option('(X)');
const DOWN_LEFT_KEY = colors.option('(Z)');
const LEFT_KEY = colors.option('(A)');
const UP_LEFT_KEY = colors.option('(Q)');

const ROWS = 8;
const COLS = 8;
const EMPTY_SQUARE = 'O';
const QUEEN = colors.piece('*');
var chessBoard = [];

/* Function taken from: https://stackoverflow.com/questions/16873323/javascript-sleep-wait-before-continuing */
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function onErr(err) {
  console.log(err);
  return 1;
}

function chooseOption() {
  console.log(colors.normalText('CHOOSE A MOVE: ' + UP_KEY + ' UP / ' + UP_RIGHT_KEY + ' UP-RIGHT / ' + RIGHT_KEY + ' RIGHT / ' + DOWN_RIGHT_KEY + ' DOWN-RIGHT'));
  console.log(colors.normalText('               ' + DOWN_KEY + ' DOWN / ' + DOWN_LEFT_KEY + ' DOWN-LEFT / ' + LEFT_KEY + ' LEFT / ' + UP_LEFT_KEY + ' UP-LEFT'));
  console.log(colors.warning('OR \'O\' TO EXIT\n'));
  let option = prompt(colors.textHighlight('YOUR CHOICE:') + ' ');
  
  return option.toLowerCase();
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
  console.log(colors.textHighlight('BOARD:\n'));
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
  console.log();
}

function moveQueen(option, position) {
  switch (option) {
    case 'w':
      position[0] -= 1;
      break;
    case 'e':
      position[0] -= 1;
      position[1] += 1;
      break;
    case 'd':
      position[1] += 1;
      break;
    case 'c':
      position[0] += 1;
      position[1] += 1;
      break;
    case 'x':
      position[0] += 1;
      break;
    case 'z':
      position[0] += 1;
      position[1] -= 1;
      break;
    case 'a':
      position[1] -= 1;
      break;
    case 'q':
      position[0] -= 1;
      position[1] -= 1;
      break;
    default:
      console.clear();
      console.log(colors.warning('\nERROR: INVALID OPTION!\n'));
      sleep(2000);
      break;
  }
}

initializeBoard();
chessBoard[0][0] = QUEEN;
let position = [0, 0];
let chosenOption;
let exitChosen = false;
console.clear();
while(exitChosen == false) {
  printBoard();
  chosenOption = chooseOption();
  if (chosenOption === 'o') {
    exitChosen = true;
    console.clear();
    console.log(colors.normalText('Thank you...'));
    sleep(1000);
    console.log(colors.normalText('Bye bye! :)'));
    sleep(1000);
  } else {
    chessBoard[position[0]][position[1]] = EMPTY_SQUARE;
    moveQueen(chosenOption, position);
    chessBoard[position[0]][position[1]] = QUEEN;
    console.clear();
  }
}
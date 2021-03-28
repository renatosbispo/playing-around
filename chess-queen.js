/* !!!! WARNING !!!! */
/* THIS SCRIPT WAS MEANT TO BE EXECUTED FROM THE COMMAND LINE */
/* AVOID RUNNING THIS SCRIPT IN A BROWSER, SEE SOURCE FOR THE sleep() FUNCTION FOR MORE INFO */
const colors = require('colors/safe');
const { log } = require('winston');
const keypress = require('keypress');

// Next 3 lines taken from: https://www.npmjs.com/package/keypress
// make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);
process.stdin.setRawMode(true);
process.stdin.resume();

colors.setTheme({
  piece: ['green', 'bold', 'underline'],
  normalText: ['blue', 'bold'],
  textHighlight: ['blue', 'bold', 'underline'],
  warning: ['red', 'bold', 'underline'],
  option: ['green', 'bold'],
  news: ['yellow', 'bold'],
});

const UP_KEY = colors.option('(W)');
const UP_RIGHT_KEY = colors.option('(E)');
const RIGHT_KEY = colors.option('(D)');
const DOWN_RIGHT_KEY = colors.option('(C)');
const DOWN_KEY = colors.option('(S)');
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

function printMenu() {
  console.log(colors.news('NEW! NO NEED TO PRESS <ENTER> ANYMORE! JUST HIT THE KEY YOU WANT :)'));
  console.log(colors.normalText('CONTROLS: ' + UP_KEY + ' UP / ' + UP_RIGHT_KEY + ' UP-RIGHT / ' + RIGHT_KEY + ' RIGHT / ' + DOWN_RIGHT_KEY + ' DOWN-RIGHT'));
  console.log(colors.normalText('          ' + DOWN_KEY + ' DOWN / ' + DOWN_LEFT_KEY + ' DOWN-LEFT / ' + LEFT_KEY + ' LEFT / ' + UP_LEFT_KEY + ' UP-LEFT'));
  console.log(colors.warning('\nPRESS (O) TO EXIT\n'));
}

function moveQueen(option, position) {
  switch (option) {
    // UP
    case 'w':
      position[0] -= 1;
      break;
    // UP-RIGHT
    case 'e':
      position[0] -= 1;
      position[1] += 1;
      break;
    // RIGHT
    case 'd':
      position[1] += 1;
      break;
    // DOWN-RIGHT
    case 'c':
      position[0] += 1;
      position[1] += 1;
      break;
    // DOWN
    case 's':
      position[0] += 1;
      break;
    // DOWN-LEFT
    case 'z':
      position[0] += 1;
      position[1] -= 1;
      break;
    // LEFT
    case 'a':
      position[1] -= 1;
      break;
    // UP-LEFT
    case 'q':
      position[0] -= 1;
      position[1] -= 1;
      break;
    default:
      console.clear();
      console.log(colors.warning('\nERROR: (' + option.toUpperCase() + ') IS NOT A VALID OPTION!\n'));
      sleep(3000);
      break;
  }
}

function continueFlow(keyPressed) {
  let position = [];
  position[0] = chessBoard[9][0];
  position[1] = chessBoard[9][1];
  chessBoard[position[0]][position[1]] = EMPTY_SQUARE;
  moveQueen(keyPressed, position);
  chessBoard[position[0]][position[1]] = QUEEN;
  chessBoard[9][0] = position[0];
  chessBoard[9][1] = position[1];
  console.clear();
  printBoard();
  printMenu();
}

function endFlow() {
  console.clear();
  console.log(colors.normalText('Thank you...'));
  sleep(1000);
  console.log(colors.normalText('Bye bye! :)'));
  sleep(1000);
  process.stdin.pause();
}

initializeBoard();
// Set the Queen initial position
chessBoard[0][0] = QUEEN;
// Store the Queen position information in a 'hidden' line of the board
chessBoard[9] = [0, 0];
console.clear();
printBoard();
printMenu();
// The code below was adapted from the example in the documentation: https://www.npmjs.com/package/keypress
// listen for the "keypress" event
process.stdin.on('keypress', function (ch, key) {
  keyPressed = key.name.toLowerCase();
  if (keyPressed == 'o') {
    endFlow();
  } else {
    continueFlow(keyPressed);
  }
});

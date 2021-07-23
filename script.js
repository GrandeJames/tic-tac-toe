// Create the gameBoard module
/*
    Add a gameBoard array which consists of the Xs and Os there should be 9

    Create the grid for the gameboard 3x3
        Get the gameboard element
        Set the template rows style (3 with each a size of 1fr)
        Set the template columns style (3 with each a size of 1fr)
    
        Then use for loop for the total amount of cells
            Create a div and set its class to cell
            Add that div to the gameboard
            Style the cell in css

    Add the click listener for each cell
        when clicked it should set the textContent to either x or o
        at the index add the letter to the index in the array
*/

const gameBoard = (() => {
  let board = ["X", "O", "X", "X", "O", "X", "X", "O", "X"];

  /*
  const BOARD_SIZE = 9;
  for (let i = 0; i < BOARD_SIZE; i++) {
    board.push("");
  }
  */

  const getCellSign = index => board[index];
  const setCellSign = (index, sign) => (board[index] = sign);
  const reset = () => board.forEach((cell, index) => (board[index] = ""));

  return { getCellSign, setCellSign, reset };
})();

const playerFactory = () => {
  let playerSign;

  const getSign = () => playerSign;
  const setSign = sign => (playerSign = sign);

  return { getSign, setSign };
};

const displayController = (() => {
  // LATER: Add listener for the grid

  const gameBoardElement = document.querySelector(".game-board");

  const GRID_SIZE = 3;

  gameBoardElement.style.gridTemplateRows = `repeat(${GRID_SIZE}, 1fr)`;
  gameBoardElement.style.gridTemplateColumns = `repeat(${GRID_SIZE}, 1fr)`;

  for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
    const cellDiv = document.createElement("div");
    cellDiv.className = "cell";

    gameBoardElement.appendChild(cellDiv);
  }

  // TASK: render the contents of the array to the webpage
  // Get each cell and change the text content
  // query all cells
  // for each cell, change the text content with the corresponding value in the array
  // stylize
  const cells = document.querySelectorAll(".cell");

  // might need to convert cells into an array
  cells.forEach((cell, index) => {
    cell.textContent = gameBoard.getCellSign(index);
  });
})();

displayController;

const player1 = playerFactory();
const player2 = playerFactory();

console.log("playerSign before set is " + player1.getSign());
console.log("playerSign before set is " + player2.getSign());

player1.setSign("X");
player2.setSign("O");

console.log("player1 sign is " + player1.getSign());
console.log("player2 sign is " + player2.getSign());

console.log(gameBoard.getCellSign(3));
gameBoard.setCellSign(3, "X");
console.log(gameBoard.getCellSign(3));
gameBoard.reset();
console.log(gameBoard.getCellSign(3));

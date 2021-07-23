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
  let _board = [];

  const BOARD_SIZE = 9;
  for (let i = 0; i < BOARD_SIZE; i++) {
    _board.push("");
  }

  const getCellSign = index => _board[index];
  const setCellSign = (index, sign) => (_board[index] = sign);
  const reset = () => _board.forEach((cell, index) => (_board[index] = ""));

  return { getCellSign, setCellSign, reset };
})();

const playerFactory = () => {
  let _playerSign;

  const getSign = () => _playerSign;
  const setSign = sign => (_playerSign = sign);

  return { getSign, setSign };
};

const displayController = (() => {
  const _createGameBoard = () => {
    const gameBoardElement = document.querySelector(".game-board");

    const GRID_SIZE = 3;
    gameBoardElement.style.gridTemplateRows = `repeat(${GRID_SIZE}, 1fr)`;
    gameBoardElement.style.gridTemplateColumns = `repeat(${GRID_SIZE}, 1fr)`;

    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
      const cellDiv = document.createElement("div");
      cellDiv.className = "cell";
      cellDiv.setAttribute("data-index", i);

      gameBoardElement.appendChild(cellDiv);
    }
  };

  const _renderContents = () => {
    const _cells = document.querySelectorAll(".cell");
    _cells.forEach((cell, index) => {
      cell.textContent = gameBoard.getCellSign(index);
    });
  };

  let nextPlayer = true;

  const _addCellClickListener = () => {
    const _cells = document.querySelectorAll(".cell");

    _cells.forEach(cell =>
      cell.addEventListener("click", () => {
        if (!cell.textContent) {
          if (nextPlayer) {
            cell.textContent = player1.getSign();
            gameBoard.setCellSign(
              cell.getAttribute("data-index"),
              player1.getSign()
            );
          } else {
            cell.textContent = player2.getSign();
            gameBoard.setCellSign(
              cell.getAttribute("data-index"),
              player2.getSign()
            );
          }
          nextPlayer = !nextPlayer;
        }
      })
    );
  };

  _createGameBoard();
  _renderContents();
  _addCellClickListener();
})();

displayController;

const player1 = playerFactory();
const player2 = playerFactory();

player1.setSign("X");
player2.setSign("O");

console.log(gameBoard.getCellSign(3));
gameBoard.setCellSign(3, "X");
console.log(gameBoard.getCellSign(3));
gameBoard.reset();
console.log(gameBoard.getCellSign(3));

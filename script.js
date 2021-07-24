const gameController = (() => {
  const _player1 = player("X");
  const _player2 = player("O");

  let _player1Choosing = true;

  const getPlayer1 = () => _player1;
  const getPlayer2 = () => _player2;

  const toggleNextPlayer = cell => {
    if (_player1Choosing) {
      displayController.setMark(cell, _player1.getSign());
    } else {
      displayController.setMark(cell, _player2.getSign());
    }
    _player1Choosing = !_player1Choosing;
  };

  const announceGameResult = () => {
    if (gameBoard.getBoard().every(element => element)) {
      displayController.setMessage("It's a tie!");
      return;
    }

    let winCombos = gameBoard.getWinCombos();

    for (let i = 0; i < winCombos.length; i++) {
      if (_isWinner(winCombos[i], _player1.getSign())) {
        displayController.setMessage("Player 1 won!");
        break;
      } else if (_isWinner(winCombos[i], _player2.getSign())) {
        displayController.setMessage("Player 2 won!");
        break;
      }
    }
  };

  const _isWinner = (arr, sign) => {
    return arr.every(innerArrVal => gameBoard.getBoard()[innerArrVal] === sign);
  };

  const reset = () => {
    // RESET THE CELLS: REMOVE ITS TEXT CONTENT
    // REMOVE MESSAGE IF THERE IS
    // RESET THE NEXT PLAYER
  };

  return {
    getPlayer1,
    getPlayer2,
    announceGameResult,
    toggleNextPlayer,
  };
})();

function player(sign) {
  const getSign = () => sign;

  return { getSign };
}

const displayController = (() => {
  _createGameBoard();
  _addCellClickListener();

  function _createGameBoard() {
    const gameBoardElement = document.querySelector(".game-board");

    const GRID_SIZE = 3;

    createGrid(GRID_SIZE);
    addCellsToGrid(GRID_SIZE);

    function createGrid(size) {
      gameBoardElement.style.gridTemplateRows = `repeat(${size}, 1fr)`;
      gameBoardElement.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    }

    function addCellsToGrid(size) {
      for (let i = 0; i < size * size; i++) {
        const cellDiv = document.createElement("div");
        cellDiv.className = "cell";
        cellDiv.setAttribute("data-index", i);

        gameBoardElement.appendChild(cellDiv);
      }
    }
  }

  function _addCellClickListener() {
    const cells = document.querySelectorAll(".cell");

    cells.forEach(cell =>
      cell.addEventListener("click", () => {
        if (!cell.textContent) {
          gameController.toggleNextPlayer(cell);
          gameController.announceGameResult();
        }
      })
    );
  }

  const setMark = (cell, sign) => {
    cell.textContent = sign;
    gameBoard.setCellSign(cell.getAttribute("data-index"), sign);
  };

  const setMessage = text => {
    document.querySelector(".message").textContent = text;
  };

  return { setMessage, setMark };
})();

const gameBoard = (() => {
  let _board = [];

  const BOARD_SIZE = 9;
  _addEmptyValues(_board, BOARD_SIZE);

  function _addEmptyValues(arr, amount) {
    for (let i = 0; i < amount; i++) {
      arr.push("");
    }
  }
  const getCellSign = index => _board[index];
  const setCellSign = (index, sign) => (_board[index] = sign);
  const reset = () => _board.forEach((cell, index) => (_board[index] = ""));
  const getBoard = () => _board;
  const getWinCombos = () => [
    // Rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonals
    [0, 4, 8],
    [2, 4, 6],
  ];

  return { getCellSign, setCellSign, reset, getBoard, getWinCombos };
})();

gameController;

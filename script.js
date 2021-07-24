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

const Player = sign => {
  const getSign = () => sign;

  return { getSign };
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

  const setMark = (cell, sign) => {
    cell.textContent = sign;
    gameBoard.setCellSign(cell.getAttribute("data-index"), sign);
  };

  const setMessage = text => {
    const message = document.querySelector(".message");
    message.textContent = text;
  };

  const _addCellClickListener = () => {
    const cells = document.querySelectorAll(".cell");
    let isGameOver = false;

    cells.forEach(cell =>
      cell.addEventListener("click", () => {
        if (!cell.textContent) {
          gameController.toggleNextPlayer(cell);
          gameController.getWinner();
        }
      })
    );
  };

  const reset = () => {
    // RESET THE CELLS: REMOVE ITS TEXT CONTENT
    // REMOVE MESSAGE IF THERE IS
    // RESET THE NEXT PLAYER
  };

  _createGameBoard();
  _addCellClickListener();

  return { setMessage, setMark };
})();

const gameController = (() => {
  displayController;

  const _player1 = Player("X");
  const _player2 = Player("O");

  const getPlayer1 = () => _player1;
  const getPlayer2 = () => _player2;

  const getWinner = () => {
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

  let _player1Choosing = true;

  const toggleNextPlayer = cell => {
    if (_player1Choosing) {
      displayController.setMark(cell, _player1.getSign());
    } else {
      displayController.setMark(cell, _player2.getSign());
    }
    _player1Choosing = !_player1Choosing;
  };

  return { getPlayer1, getPlayer2, getWinner, toggleNextPlayer };
})();

gameController;

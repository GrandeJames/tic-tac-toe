const gameBoard = (() => {
  let _board = [];

  const BOARD_SIZE = 9;
  for (let i = 0; i < BOARD_SIZE; i++) {
    _board.push("");
  }

  const getCellSign = index => _board[index];
  const setCellSign = (index, sign) => (_board[index] = sign);
  const reset = () => _board.forEach((cell, index) => (_board[index] = ""));
  const getBoard = () => _board;

  return { getCellSign, setCellSign, reset, getBoard };
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

  const _renderContents = () => {
    const _cells = document.querySelectorAll(".cell");
    _cells.forEach((cell, index) => {
      cell.textContent = gameBoard.getCellSign(index);
    });
  };

  let nextPlayer = true;

  const setPlayerContent = (player, cell) => {
    cell.textContent = player.getSign();
    gameBoard.setCellSign(cell.getAttribute("data-index"), player.getSign());
  };

  const winCombos = [
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

  const _setMessage = text => {
    const message = document.querySelector(".message");
    message.textContent = text;
  };

  const _addCellClickListener = () => {
    const _cells = document.querySelectorAll(".cell");
    let isGameOver = false;

    _cells.forEach(cell =>
      cell.addEventListener("click", () => {
        if (!cell.textContent) {
          nextPlayer
            ? setPlayerContent(gameController.getPlayer1(), cell)
            : setPlayerContent(gameController.getPlayer2(), cell);
          nextPlayer = !nextPlayer;

          if (gameBoard.getBoard().every(element => element)) {
            _setMessage("It's a tie!");
            return;
          }

          for (let i = 0; i < winCombos.length; i++) {
            if (
              winCombos[i].every(
                innerArrVal =>
                  gameBoard.getBoard()[innerArrVal] ===
                  gameController.getPlayer1().getSign()
              )
            ) {
              _setMessage("Player 1 won!");
              break;
            } else if (
              winCombos[i].every(
                innerArrVal =>
                  gameBoard.getBoard()[innerArrVal] ===
                  gameController.getPlayer2().getSign()
              )
            ) {
              _setMessage("Player 2 won!");
              break;
            }
          }
        }
      })
    );
  };

  const reset = () => {};

  _createGameBoard();
  _renderContents();
  _addCellClickListener();
})();

const gameController = (() => {
  displayController;

  const _player1 = Player("X");
  const _player2 = Player("O");

  const getPlayer1 = () => _player1;
  const getPlayer2 = () => _player2;

  return { getPlayer1, getPlayer2 };
})();

gameController;

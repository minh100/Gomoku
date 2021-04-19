export default class Game {
    constructor(size, playerArray) {
        this.size = size;
        this.playerArray = playerArray;

        let newboard = new Array(size);
        for (let i = 0; i < newboard.length; i++) {
            newboard[i] = new Array(size).fill(-1);
        }

        this.board = newboard;

        // first, randomly chooses the starting player
        let randomInitalTurn = Math.floor(Math.random() * playerArray.length);

        // used to decide whose turn is it currently
        this.currentTurn = randomInitalTurn

        this.winner = -1;   // if a player won assign them as winner
        this.draw = false;      // if game is draw

        // end point of winning pieces
        this.win1 = {   
            col: 0,
            row: 0
        };

        // starting point of winning pieces
        this.win2 = {
            col: 0,
            row: 0
        }

    };

    /**
     * Resets the game 
     */
    setupNewGame() {
        let newGame = new Game(this.size, this.playerArray);
        this.board = newGame.board;
        this.currentTurn = newGame.currentTurn;
        this.winner = -1;
        this.draw = false;
        this.win1 = {   
            col: 0,
            row: 0
        };
        this.win2 = {
            col: 0,
            row: 0
        }
    }

    /**
     * Handles what happens when a tile is clicked on
     * @param {number} row 
     * @param {number} col 
     */
    click(row, col) {
        if(this.winner === -1 && !this.draw) {  // check if game is over
            if (this.board[row][col] === -1) {  // check if space clicked is a valid space
                this.board[row][col] = this.currentTurn
                if (checkWin(this.board, row, col, this.currentTurn, this.win1, this.win2)) {
                    this.winner = this.currentTurn;
                } 
                else if(checkDraw(this.board)) {
                    this.draw = true;
                } 
                else {  // update currentTurn to next player
                    if (this.currentTurn !== this.playerArray.length - 1) {
                        this.currentTurn++;
                    } else {
                        this.currentTurn = 0;
                    }
                }
            }
        }
    }
}

/**
 * Checks to see if a player's piece count is >= 5 in order to win
 *      goes through every direction to check
 *      since 2d array start at top left we have to adjust values to go in the correct direction
 * @param {2d number array} board represents the board
 * @param {number} row represents the current row
 * @param {number} col represents the current column
 * @param {numer} currentTurn represents the current player
 * @returns {boolean}true if a player has won else false
 */
export function checkWin(board, row, col, currentTurn, win1, win2) {
    // checks vertically
    if (count(board, row, col, currentTurn, -1, 0, win1, win2) >= 5) {
        return true;
    }

    // // checks positive slope
    if (count(board, row, col, currentTurn, -1, 1, win1, win2) >= 5) {
        return true;
    }
    
    // // checks negative slope
    if (count(board, row, col, currentTurn, -1, -1, win1, win2) >= 5) {
        return true;
    }

    // // checks horizontally
    if (count(board, row, col, currentTurn, 0, -1, win1, win2) >= 5) {
        return true;
    }

    return false
}

/**
 * Counts the number of a player's pieces in a given direction
 *      starts at (currentRow, currentCol) and moves both fowards and backwards in the given dirRow, dirCol
 * @param {2d number array} board represents the board
 * @param {number} currentRow represents the current row
 * @param {number} currentCol represents the current column
 * @param {number} currentTurn represents the current player
 * @param {number} dirRow represents the horizontal direction to go in
 * @param {number} dirCol represents the vertical direction to go in
 * @returns {array} the number of pieces in a given direction, win1, win2
 */
export function count(board, currentRow, currentCol, currentTurn, dirRow, dirCol, win1, win2) {
    let playerPiecesCount = 1;

    let row = currentRow + dirRow;
    let col = currentCol + dirCol;
    while (row >= 0 && row < board.length && col >= 0 && col < board.length && board[row][col] === currentTurn) {
        playerPiecesCount++;
        row += dirRow;
        col += dirCol;
    };

    // set top positions of win pieces
    // row is row
    // col is col
    win1.row = row - dirRow;
    win1.col = col - dirCol;

    row = currentRow - dirRow;
    col = currentCol - dirCol;
    while (row >= 0 && row < board.length && col >= 0 && col < board.length && board[row][col] === currentTurn) {
        playerPiecesCount++;
        row -= dirRow;
        col -= dirCol;
    };

    // set bottom positions of win pieces
    win2.row = row + dirRow;
    win2.col = col + dirCol;

    // return [playerPiecesCount, win1, win2];
    return playerPiecesCount;
}

/**
 * Checks to see if the game has ended in a draw
 *      Goes through every piece on the board to see if it is empty
 * @param {2d number array} board represents the board
 * @returns false if there is an empty space on the board
 */
export function checkDraw(board) {
    for(let row = 0; row < board.length; row++) {
        for(let col = 0; col < board.length; col++) {
            if(board[row][col] === -1) {
                return false;
            }
        }
    }
    return true;
}
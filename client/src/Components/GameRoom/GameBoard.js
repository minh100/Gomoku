import React, { useState, useEffect, useContext } from 'react'
import { Tile } from '../Gomoku/Tile.js';
import '../Gomoku/Board.css';
import Game from '../../Engine/Game.js';
import { SocketContext } from '../../Global/GlobalSocket/Socket.js';

export const GameBoard = ({ game, currentRoom, profile }) => {
    console.log('wewewewe', currentRoom)

    let gameInstance = new Game(15, game.playerArray, game.board, game.currentTurn, game.winner, game.draw, game.win1, game.win2, game.ratingWin, game.ratingLose);

    const [gameModel, updateGameModel] = useState(gameInstance);
    const [rerender, toggleRerender] = useState(false);
    const [winningPoints, setWinningPoints] = useState([]);
    const socket = useContext(SocketContext);

    const handleClick = (row, col) => {
        if (gameModel.winner === -1 && !gameModel.draw && currentRoom.playerArray[gameModel.currentTurn].username === profile.username) {
            console.log(`Clicked row: ${row} col: ${col}`);
            gameModel.click(row, col);
            updateGameModel(gameModel);
            toggleRerender(!rerender);

            console.log('when clicked', gameModel);

            gameModel.board = gameModel.board.flat();
            socket.emit('updateGame', ({ gameModel, currentRoom }));

            let rearrangedBoard = [];
            for (let row = 0; row < 224; row += 15) {
                rearrangedBoard.push(gameModel.board.slice(row, row + 15))
            }
            gameModel.board = rearrangedBoard;
            if (gameModel.winner !== -1) {
                let res = findWinningPoints(gameModel);
                setWinningPoints(res);
            }
        }
    }

    const handleReset = () => {
        console.log("reset");
        gameModel.setupNewGame();
        toggleRerender(!rerender);
        setWinningPoints([]);
    }
    console.log('gameModel', gameModel);
    console.log('game current player', currentRoom.playerArray[gameModel.currentTurn].username);
    console.log('current user', profile.username)

    useEffect(() => {
        socket.on('sendUpdatedGame', (updatedGame) => {
            console.log('updatedGame from socket', updatedGame);
            let gameInstance = new Game(15, updatedGame.game.playerArray, updatedGame.game.board, updatedGame.game.currentTurn, updatedGame.game.winner, updatedGame.game.draw, updatedGame.game.win1, updatedGame.game.win2, updatedGame.game.ratingWin, updatedGame.game.ratingLose);
            console.log('game instance', gameInstance)
            updateGameModel(gameInstance);
        })
    }, [socket])

    return (
        <>
            {
                gameModel.winner !== -1 ? (
                    <h1 className="pl-2 mb-2 text-base text-gray-700 md:text-lg">Winner: <span className="text-purple-600">{currentRoom.playerArray[gameModel.currentTurn].username}</span></h1>
                ) : (
                    <h1 className="pl-2 mb-2 text-base text-gray-700 md:text-lg">Current Turn: <span className="text-purple-600">{currentRoom.playerArray[gameModel.currentTurn].username}</span></h1>
                )
            }
            <div className="grid grid-cols-15 grid-rows-15">
                {
                    gameModel.board.map((tile, row) => {
                        return tile.map((value, col) => {

                            // check to see if the current piece is a winning one
                            let isWinningPiece = false;

                            for (let i = 0; i < winningPoints.length; i++) {
                                if (winningPoints[i].col === col && winningPoints[i].row === row) {
                                    isWinningPiece = true;
                                    break;
                                }
                            }

                            return <Tile key={`${row}:${col}`}
                                value={value}
                                handleClick={handleClick}
                                row={row}
                                col={col}
                                isWinningPiece={isWinningPiece}
                            />
                        })
                    })
                }
                <button onClick={() => handleReset()}>Reset</button>
            </div>
        </>
    )
}

/**
 * 
 * @param {object} gameModel represents the current gameModel
 * @returns {array of objects} represents all the pieces that makes a win
 */
const findWinningPoints = (gameModel) => {
    let win1 = gameModel.win1;
    let win2 = gameModel.win2;

    let rise = win2.row - win1.row;
    let run = win2.col - win1.col;

    let array = [];         // return array variable

    let dirCol = 0;
    let dirRow = 0;
    let slope = 0;

    if (rise === 0) {        // rise = 0 then horizontal check
        dirCol = -1;

    } else if (run === 0) {  // run = 0 then vertical check
        dirRow = -1;
    } else {
        slope = rise / run; // check what slope it is
        if (slope > 0) {
            dirCol = -1;
            dirRow = -1;
        } else if (slope < 0) {
            dirCol = 1;
            dirRow = -1;
        }
    }

    // add all winning pieces
    if (slope < 0) {    // special case looping for negative slope
        while (win2.col <= win1.col && win2.row >= win1.row) {
            array.push({
                col: win2.col,
                row: win2.row
            })
            win2.col += dirCol;
            win2.row += dirRow;
        }
    } else {
        while (win2.col >= win1.col && win2.row >= win1.row) {
            array.push({
                col: win2.col,
                row: win2.row
            })
            win2.col += dirCol;
            win2.row += dirRow;
        }
    }

    return array;
}


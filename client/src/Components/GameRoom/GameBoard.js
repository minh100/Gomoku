import React, { useState } from 'react'
import { Tile } from '../Gomoku/Tile.js';
import '../Gomoku/Board.css';
import Game from '../../Engine/Game.js';

export const GameBoard = ({ game }) => {

    let gameInstance = new Game(15, game.playerArray, game.board, game.currentTurn, game.winner, game.draw, game.win1, game.win2);

    const [gameModel, updateGameModel] = useState(gameInstance);
    const [rerender, toggleRerender] = useState(false);
    const [winningPoints, setWinningPoints] = useState([]);

    const handleClick = (row, col) => {
        if (gameModel.winner === -1) {
            console.log(`Clicked row: ${row} col: ${col}`);
            gameModel.click(row, col);
            updateGameModel(gameModel);
            toggleRerender(!rerender);
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
    console.log('game', game);
    console.log('gameModel', gameModel)

    return (
        <div className="relative flex flex-col py-16 lg:py-0 lg:flex-col">
            <div className="w-full max-w-xl px-4 mx-auto md:px-0 lg:px-8 lg:py-20 lg:max-w-screen-xl">
                <div className="mb-0 lg:max-w-lg lg:pr-8 xl:pr-6">
                    <h1>{`Current Turn: ${gameModel.playerArray[gameModel.currentTurn]}`}</h1>
                </div>
            </div>
            <div className="inset-y-0 top-0 right-0 w-full max-w-xl px-4 mx-auto mb-6 md:px-0 lg:pl-8 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-1/2 lg:max-w-full lg:absolute xl:px-0">
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
            </div>
        </div>
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


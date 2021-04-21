import React, { useState } from 'react'
import Game from '../../Engine/Game.js';
import { Tile } from '../Gomoku/Tile.js';
import '../Gomoku/Board.css';

export const GameBoard = () => {

    const game = new Game(15, [0, 1]);

    const [gameModel, updateGameModel] = useState(game);
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

    return (
        <div className="md:container md:mx-auto min-h-screen min-w-full flex justify-center items-center">
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


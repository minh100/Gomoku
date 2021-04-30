import React from 'react'
import './Tile.css';

export const Tile = ({ value, handleClick, row, col, isWinningPiece }) => {

    const isTop = row === 4 && (col >= 4 && col <= 10);
    const isLeft = col === 4 && (row >= 4 && row <= 10);
    const isTopLeft = row === 4 && col === 4;
    const isBottom = row === 10 && (col >= 4 && col <= 10);
    const isBottomLeft = row === 10 && col === 4;
    const isRight = col === 10 && (row >= 4 && row <= 10);
    const isTopRight = col === 10 && row === 4;
    const isBottomRight = col === 10 && row === 10;

    return (
        <div className={`${isWinningPiece ? "bg-green-100" : ""} 
                        ${isTop && 'isTop'}
                        ${isLeft && 'isLeft'}
                        ${isTopLeft && 'isTopLeft'}
                        ${isBottom && 'isBottom'}
                        ${isBottomLeft && 'isBottomLeft'}
                        ${isRight && 'isRight'}
                        ${isTopRight && 'isTopRight'}
                        ${isBottomRight && 'isBottomRight'}
                        border-2 border-gray-300 tile text-2xl lg:h-10 lg:w-10 flex justify-center items-center select-none`}
            onClick={() => handleClick(row, col)}
        >
            {renderSwitch(value)}
        </div>
    )
}

function renderSwitch(value) {
    switch(value) {
        case 0:
            return "✘";
        case 1:
            return "〇";
        default:
            return;

    }
}
import React from 'react'
import './Tile.css';

export const Tile = ({ value, handleClick, row, col, isWinningPiece }) => {
    return (
        <div className={`${isWinningPiece ? "bg-green-100" : ""} tile border-2 border-gray-300 text-2xl lg:h-10 w-10 flex justify-center items-center`}
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
        case 2:
            return "▲";
        case 3:
            return "♦";
        default:
            return;

    }
}
import React from 'react'

import { Navbar } from './Navbar.js';
import { Board} from '../Gomoku/Board.js';

export const Lobby = () => {
    return (
        <div className="container min-h-screen min-w-full bg-light">
            <Navbar />
            <div className="md:container md:mx-auto min-h-screen min-w-full flex justify-center items-center">
                <Board />
            </div>

        </div>
    )
};

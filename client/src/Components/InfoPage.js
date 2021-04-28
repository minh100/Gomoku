import React from 'react'

import { Link } from 'react-router-dom';

export const InfoPage = () => {
    return (
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="max-w-xl sm:mx-auto lg:max-w-2xl">
                <div className="flex flex-col mb-16 sm:text-center sm:mb-0">
                    <div className="mb-6 sm:mx-auto">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#7C3AED">
                                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                            </svg>
                        </div>
                    </div>
                    <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
                        <h2 className="max-w-lg mb-6 text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                            What is Gomoku
                        </h2>
                        <div className="text-base text-gray-700 md:text-lg">
                            <div className="text-3xl text-purple-600 text-left leading-tight h-3">“</div>
                            Gomoku, also called <em>Five in a Row</em>, <em>Caro</em>, <em>Omok</em>, is an abstract strategy board game. <br />
                            Players take turn placing their pieces on an empty space on a 15x15 board.
                            The winner is the first player to form an unbroken chain of five of the same pieces.
                            <div className="text-3xl text-purple-600 text-right leading-tight h-3">“</div>
                        </div>
                        <a href="https://en.wikipedia.org/wiki/Gomoku" target="_blank" rel="noreferrer" className="text-xs text-gray-500 dark:text-gray-300 text-center">
                            https://en.wikipedia.org/wiki/Gomoku
                        </a>
                    </div>
                    <div className="space-x-2">
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-purple-600 hover:bg-purple-700 focus:shadow-outline focus:outline-none"
                        >
                            Play
                        </Link>
                        <a className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-purple-600 transition duration-200 rounded shadow-md hover:bg-gray-700 hover:text-white focus:shadow-outline focus:outline-none" 
                            href="https://minh100.github.io/portfolio/" target="_blank" rel="noreferrer"
                        >
                            Minh Truong
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
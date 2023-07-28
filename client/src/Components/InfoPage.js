import React from 'react'

export const InfoPage = () => {
    return (

        <div className="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-12">
            <div className="max-w-xl sm:mx-auto lg:max-w-2xl">
                <div className="flex flex-col text-center mb-16 sm:text-center sm:mb-0 bg-gray-900 rounded-xl p-4">
                    <div className="mb-6 sm:mx-auto flex justify-center">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#7C3AED">
                                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                            </svg>
                        </div>
                    </div>
                    <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-xl md:mb-12">
                        <h2 className="max-w-lg mb-6 text-3xl font-bold leading-none tracking-tight text-white sm:text-4xl md:mx-auto">
                            What is Gomoku
                        </h2>
                        <div className="text-base text-white md:text-lg">
                            <div className="text-3xl text-purple-600 text-left leading-tight h-3 sm:h-4">“</div>
                            Gomoku, also called <em>Five in a Row</em>, <em>Caro</em>, <em>Omok</em>, is an abstract strategy board game. <br />
                            Players take turn placing their pieces on an empty space on a 15x15 board.
                            The winner is the first player to form an unbroken chain of five of the same pieces.
                            <div className="text-3xl text-purple-600 text-right leading-tight h-3">“</div>
                        </div>
                        <a href="https://en.wikipedia.org/wiki/Gomoku" target="_blank" rel="noreferrer" className="text-xs text-gray-200 dark:text-gray-300 text-center underline">
                            https://en.wikipedia.org/wiki/Gomoku
                        </a>
                    </div>
                    <div className="flex flex-col items-center">
                        {/* <a className="inline-flex items-center w-2/5 justify-center h-12 space-x-4 font-medium tracking-wide text-purple-600 bg-white transition duration-200 rounded shadow-md hover:bg-gray-200 hover:text-purple-600 focus:shadow-outline focus:outline-none"
                            href="https://minh100.github.io/portfolio/" target="_blank" rel="noreferrer"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            <span>Minh Truong</span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a> */}

                    </div>
                </div>
                <div className="px-4 py-4 text-center mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:pt-16">
                    <div className="inline-flex items-center w-full justify-center h-12 space-x-4 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-purple-600 focus:shadow-outline focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <span>How to Play</span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <div className="max-w-xl mt-10 mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
                        <h2 className="max-w-lg mb-6 text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                            Long Pro Opening
                        </h2>
                        <div className="text-base text-gray-700 md:text-lg">
                            <div className="text-3xl text-purple-600 text-left leading-tight h-3 sm:h-4">“</div>
                                Long pro opening rule is suitable for fair games because it does not have so much importance on who opens and starts the game, each piece has a nearly equal chance at winning.
                            <div className="text-3xl text-purple-600 text-right leading-tight h-3">“</div>
                        </div>
                        <a href="http://gomokuworld.com/gomoku/2" target="_blank" rel="noreferrer" className="text-xs text-gray-500 dark:text-gray-300 text-center underline">
                            Learn More
                        </a>
                    </div>
                </div>
            </div>
            <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
                <div className="max-w-2xl sm:mx-auto lg:max-w-3xl">
                    <section className="grid gap-8 row-gap-0 lg:grid-cols-4">
                        <div className="relative text-center">
                            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-50 sm:w-20 sm:h-20">
                                <svg
                                    className="w-12 h-12 text-deep-purple-accent-400 sm:w-16 sm:h-16"
                                    stroke="currentColor"
                                    viewBox="0 0 52 52"
                                >
                                    <polygon
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        fill="none"
                                        points="29 13 14 29 25 29 23 39 38 23 27 23"
                                    />
                                </svg>
                            </div>
                            <h6 className="mb-2 text-2xl font-extrabold">First Move</h6>
                            <p className="max-w-md mb-3 text-sm text-gray-900 sm:mx-auto sm:w-3/5 md:w-full">
                                First player will have their piece automatically played at the center of the board
                                </p>
                            <div className="top-0 right-0 flex items-center justify-center h-24 lg:-mr-8 lg:absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-9 text-gray-700 transform rotate-90 lg:rotate-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </div>
                        </div>
                        <div className="relative text-center">
                            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-50 sm:w-20 sm:h-20">
                                <svg
                                    className="w-12 h-12 text-deep-purple-accent-400 sm:w-16 sm:h-16"
                                    stroke="currentColor"
                                    viewBox="0 0 52 52"
                                >
                                    <polygon
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        fill="none"
                                        points="29 13 14 29 25 29 23 39 38 23 27 23"
                                    />
                                </svg>
                            </div>
                            <h6 className="mb-2 text-2xl font-extrabold">Second Move</h6>
                            <p className="max-w-md mb-3 text-sm text-gray-900 sm:mx-auto sm:w-3/5 md:w-full">
                                Second player can put their stone anywhere on the board
                                </p>
                            <div className="top-0 right-0 flex items-center justify-center h-24 lg:-mr-8 lg:absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-9 text-gray-700 transform rotate-90 lg:rotate-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </div>
                        </div>
                        <div className="relative text-center">
                            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-50 sm:w-20 sm:h-20">
                                <svg
                                    className="w-12 h-12 text-deep-purple-accent-400 sm:w-16 sm:h-16"
                                    stroke="currentColor"
                                    viewBox="0 0 52 52"
                                >
                                    <polygon
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        fill="none"
                                        points="29 13 14 29 25 29 23 39 38 23 27 23"
                                    />
                                </svg>
                            </div>
                            <h6 className="mb-2 text-2xl font-extrabold">Third Move</h6>
                            <p className="max-w-md mb-3 text-sm text-gray-900 sm:mx-auto sm:w-3/5 md:w-full">
                                The third piece must be placed outside of the center 7x7 square
                                </p>
                            <div className="top-0 right-0 flex items-center justify-center h-24 lg:-mr-8 lg:absolute">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-9 text-gray-700 transform rotate-90 lg:rotate-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </div>
                        </div>
                        <div className="relative text-center">
                            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-50 sm:w-20 sm:h-20">
                                <svg
                                    className="w-12 h-12 text-deep-purple-accent-400 sm:w-16 sm:h-16"
                                    stroke="currentColor"
                                    viewBox="0 0 52 52"
                                >
                                    <polygon
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        fill="none"
                                        points="29 13 14 29 25 29 23 39 38 23 27 23"
                                    />
                                </svg>
                            </div>
                            <h6 className="mb-2 text-2xl font-extrabold">Winning</h6>
                            <p className="max-w-md mb-3 text-sm text-gray-900 sm:mx-auto sm:w-3/5 md:w-full">
                                Now play the game like normal and try to make an unbroken chain of 5 of your pieces to win!
                                </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>


    )
}
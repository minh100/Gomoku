import React, { useState, useRef, useEffect, useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";

import {SocketContext} from '../../Global/GlobalSocket/Socket.js';

function usePrompt(message, when) {
    const history = useHistory();
    const unblock = useRef(null);

    useEffect(() => {
        if (when) {
            unblock.current = history.block(message);
        } else {
            unblock.current = null;
        }
        return () => {
            if (unblock.current) {
                unblock.current();
            }
        };
    }, [when, history, message]);
}

function useCallbackPrompt(when) {
    const history = useHistory();
    const [showPrompt, setShowPrompt] = useState(false);
    const [lastLocation, setLastLocation] = useState(null);
    const [confirmedNavigation, setConfirmedNavigation] = useState(false);
    const socket = useContext(SocketContext);

    const cancelNavigation = useCallback(() => {
        setShowPrompt(false);
    }, []);

    const handleBlockedNavigation = useCallback(
        nextLocation => {
            if (!confirmedNavigation) {
                setShowPrompt(true);
                setLastLocation(nextLocation);
                return false;
            }
            return true;
        },
        [confirmedNavigation]
    );

    const confirmNavigation = useCallback(({currentRoom}) => {
        setShowPrompt(false);
        setConfirmedNavigation(true);
        socket.emit('deleteGameRoom', ({currentRoom}));
    }, []);

    useEffect(() => {
        if (confirmedNavigation && lastLocation) {
            history.push(lastLocation.pathname);
        }
    }, [confirmedNavigation, lastLocation]);

    usePrompt(handleBlockedNavigation, when);

    return [showPrompt, confirmNavigation, cancelNavigation];
}

function LeavePrompt({ isBlocking, currentRoom}) {
    const [showPrompt, confirmNavigation, cancelNavigation] = useCallbackPrompt(isBlocking);
    return (
        <>
            {
                showPrompt && (
                    <>
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                            <div className="relative w-auto my-6 mx-auto max-w-sm">
                                {/*content*/}
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    {/*header*/}
                                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                        <h3 className="text-3xl font-semibold text-purple-600">
                                            Leave Game Room?
                                        </h3>
                                    </div>
                                    {/*body*/}
                                    <div className="relative p-6 flex-auto">
                                        <p className="text-blueGray-500 text-lg leading-relaxed">
                                            Leaving will cause the room to be deleted.
                                            <br/>
                                            <br/>
                                            Do you want to leave anyway?
                                        </p>
                                    </div>
                                    {/*footer*/}
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                        <button
                                            className="bg-green-500 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={cancelNavigation}
                                        >
                                            Stay
                                        </button>
                                        <button
                                            className="bg-red-500 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => confirmNavigation({currentRoom})}
                                        >
                                            Leave Anyway
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                )
            }
        </>
    );
}

export const LeaveForm = ({when, currentRoom}) => {
    return (
        <LeavePrompt isBlocking={when} currentRoom={currentRoom}/>
    );
}

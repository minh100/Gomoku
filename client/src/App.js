import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { GlobalRoomProvider } from './Global/GlobalRoom/GlobalRoomState.js';
import { GlobalUserProvider } from './Global/GlobalUser/GlobalUserState.js';
import { Lobby } from './Components/Lobby/Lobby.js';
import { Navbar } from './Components/Navbar.js';
import { LocalBoard } from './Components/Gomoku/LocalBoard.js';
import { Login } from './Components/LandingPage/Login.js';
import { SignUp } from './Components/LandingPage/SignUp.js';
import { Leaderboard } from './Components/Leaderboard/Leaderboard.js';
import { SocketContext, socket } from './Global/GlobalSocket/Socket.js';
import { GameRoom } from './Components/GameRoom/GameRoom.js';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallBack } from './Components/ErrorFallBack.js';
import { InfoPage } from './Components/InfoPage.js';

function App() {
  return (
    <Router basename="/Gomoku">
      <GlobalUserProvider>
        <GlobalRoomProvider>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <ErrorBoundary FallbackComponent={ErrorFallBack}>
              <SocketContext.Provider value={socket} >
                <Navbar />
                <Route exact path="/" component={Lobby} />
                <Route path="/leaderboard" component={Leaderboard} forceRefresh />
                <Route exact path="/localplay" component={LocalBoard} />
                <Route exact path="/info" component={InfoPage} />
                <Route path="/play" component={GameRoom} />
              </SocketContext.Provider>
            </ErrorBoundary>
          </Switch>
        </GlobalRoomProvider>
      </GlobalUserProvider>
    </Router>
  );
}

export default App;

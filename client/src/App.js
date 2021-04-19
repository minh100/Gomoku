import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { GlobalRoomProvider } from './Global/GlobalRoom/GlobalRoomState.js';
import { GlobalUserProvider } from './Global/GlobalUser/GlobalUserState.js';
import { Lobby } from './Components/Lobby/Lobby.js';
import { Navbar } from './Components/Navbar.js';
import { Board } from './Components/Gomoku/Board.js';
import { Login } from './Components/LandingPage/Login.js';
import { SignUp } from './Components/LandingPage/SignUp.js';
import { Leaderboard} from './Components/Leaderboard/Leaderboard.js';

function App() {
  return (
    <Router basename="/Gomoku">
      <GlobalUserProvider>
        <GlobalRoomProvider>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <>
              <Navbar />
              <Route exact path="/" component={Lobby} />
              <Route exact path="/leaderboard" component={Leaderboard} />
              <Route exact path="/localplay" component={Board} />
            </>
          </Switch>
        </GlobalRoomProvider>
      </GlobalUserProvider>
    </Router>
  );
}

export default App;

import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Lobby } from './Components/Lobby/Lobby.js';
import { Navbar } from './Components/Navbar.js';
import { Board } from './Components/Gomoku/Board.js';

function App() {
  return (
    <Router basename="/Gomoku">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Lobby}/>
        <Route path="/localplay" component={Board} />
      </Switch>
    </Router>
  );
}

export default App;

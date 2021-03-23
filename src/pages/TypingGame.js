import React from 'react'
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";

import MainGame from '../components/main-game.js'
import Welcome from '../components/welcome.js';


const TypingGame = () => {

  return (

        <div>
        <Router>
            <Route path="/" component={MainGame} />
        </Router>
        </div>

  )
}

export default TypingGame

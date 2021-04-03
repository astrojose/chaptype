import React from 'react'
import { Route, BrowserRouter as Router } from "react-router-dom";
import swahili from '../random';

import MainGame from '../components/main-game.js'

const TypingGame = () => {
  const sw = new swahili(16);
  // let randQuote = quotesArr[(Math.random()*quotesArr.length)|0];
  let randQuote = sw.paragraph()
  
  
  // let phrase = "Wahusika hao, ambao kwa kawaida ni mmoja au wawili hujitokeza kutoka mwanzo hadi mwisho wa hadithi. Mara kwa mara wahusika hawa"

  return (
      <div>
        <Router>
              {/* <Route path="/" component={MainGame} /> */}
            <Route  
              path='/'
              render={(props) => (
                <MainGame {...props} quote={randQuote} />
              )}
            />
        </Router>
      </div>
  )
}

export default TypingGame

import React from 'react'
import { Route, Switch } from "react-router-dom";
import swahili from '../random';

import MainGame from '../components/main-game.js'
import Welcome from '../components/welcome.js'

const TypingGame = () => {
  const sw = new swahili(58);
  // let randQuote = quotesArr[(Math.random()*quotesArr.length)|0];
  let randQuote = sw.paragraph()
  
  
  // let phrase = "Wahusika hao, ambao kwa kawaida ni mmoja au wawili hujitokeza kutoka mwanzo hadi mwisho wa hadithi. Mara kwa mara wahusika hawa"

  return (
      <div>
            <Switch>
              <Route exact path="/" component={Welcome} />
              <Route  exact
                path='/type'
                render={(props) => (
                  <MainGame {...props} quote={randQuote} />
                )}
              />
            </Switch>
      </div>
  )
}

export default TypingGame

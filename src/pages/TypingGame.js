import React from 'react'
import { Route, Switch } from "react-router-dom";
import swahili from '../random';
import {getQuote} from '../utils'

import MainGame from '../components/main-game.js'

const TypingGame = () => {
  const sw = new swahili(58);
  // let randQuote = quotesArr[(Math.random()*quotesArr.length)|0];
  let randQuote = sw.paragraph()

  //let phrase = "Wahusika hao, ambao kwa kawaida ni mmoja au wawili hujitokeza kutoka mwanzo hadi mwisho wa hadithi. Mara kwa mara wahusika hawa"
  let phrase = getQuote()

  return (
      <div>
            <Switch>
              <Route  exact
                path='/random'
                render={(props) => (
                  <MainGame {...props} quote={randQuote}  />
                )}
              />
              <Route  exact
                path='/quotes'
                render={(props) => (
                  <MainGame {...props} quote={phrase.quote} author={phrase.author} source={phrase.book} />
                )}
              />
            </Switch>
      </div>
  )
}

export default TypingGame

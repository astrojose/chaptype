import React from 'react'
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";

import MainGame from '../components/main-game.js'
import Welcome from '../components/welcome.js';

const TypingGame = () => {

  let quotesArr = [
    "Msafara wa mamba haukosi burukenge", "Ukichengwa tulia",
    "Kuongeza uzani kama nakudai ni madharau",
    "Kazi ya moyo ni kusukuma damu, kupenda ni kiherehere",
    "Salimia watu, pesa huisha",
    "Pambana na hali yako",
    "Hata uwe na imani kali vipi, huwezi kusali wakati unafanya mapenzi",
    "Mwanaume hata awe bahili vipi, hawezi kumpa mwanamke mimba nusu",
    "Akishindwa sultani, raia huweza nini?",
    "Aliyetota, hajui kutota",
    "Baniani mbaya kiatu chake dawa",
    "Bure ni malio, pasipo na sikio",
    "Cha mlevi huliwa na mgema",
    "Aigae tembo kunya hupasuka msamba",
    "Hata uwe kauzu vipi, huwezi kujamba wakati unatongoza",
    "Mke wa mtu sumu, mume wa mtu maziwa",
    "Silaha ni pesa, bunduki ni mizigo tu",
    "Kipara bila pesa   ni kovu",
    "Ukipenda wasichana wa shule nunulia mkeo sare",
    "Nyani haoni kundule",
    "Maskini akipata matako hulia mbwata",
    "Mficha uchi hazai",
    "Ukinidiliti mwenzako atanidanlodi"
  ]

  let randQuote = quotesArr[(Math.random()*quotesArr.length)|0];

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

import React from 'react'

const Home = (props) => {
    return (
      <div>
            <content>
                <div className="welcome">
                <p>Master your typing abilities with diverse typing games. </p> <br/>
                <p>Get started</p>
                </div>
                <div className="cta">
                    <a href='/random'>Common Swahili Words</a>
                </div>
                <div className="cta">
                    <a href='/quotes'>Swahili Quotes</a>
                </div>
            </content>
    
      </div>
  )
}

export default Home

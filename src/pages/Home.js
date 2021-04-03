import React from 'react'

const Home = (props) => {
    return (
      <div>
            <content>
                <div className="welcome">
                <p>Master your typing abilities with diverse typing games. Get started</p>
                </div>
                <div className="cta">
                    <button onClick={()=>{window.location = '/typing-test'}}>Start typing</button>
                </div>
            </content>
    
      </div>
  )
}

export default Home

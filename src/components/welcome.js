import React from 'react'

const Welcome = () => {
    return (
        <content>
            <div className="welcome">
               <p>Master your typing abilities with diverse typing games. Get started</p>
            </div>
            <div className="cta">
                <button onClick={
                  ()=>{
                    window.location = '/'
                  }
                }>Start typing
                </button>
            </div>
        </content>
    )
}

export default Welcome

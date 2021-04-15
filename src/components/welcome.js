import React from 'react'
import {Link} from 'react-router-dom'

const Welcome = () => {
    return (
        <content>
            <div className="welcome">
               <p>Master your typing abilities with diverse typing games. Get started</p>
            </div>
            <div className="cta">
                <div className="cta">
                    <Link to='/type'>Start typing</Link>
                </div>
            </div>
        </content>
    )
}

export default Welcome

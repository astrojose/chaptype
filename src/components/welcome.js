import React from 'react'
import {Link} from 'react-router-dom'

const Welcome = () => {
    return (
        <content className='home '>
            <div className="welcome">
               <p>Master your typing abilities with diverse swahili typing test.</p>
                <p>Get started</p>
            </div>
            <div className="buttons">
                <div className="cta">
                    <Link to='/random'> Words</Link>
                </div>
                <div className="cta">
                    <Link to='/quotes'> Quotes</Link>
                </div>
            </div>
        </content>
    )
}

export default Welcome

import React from 'react'
import {Link} from 'react-router-dom'


const Footer = () => {
    return (
        <footer>
            <div className='links'>
                <ul>
                    <li><a href="twitter.com/chaptype">twitter</a></li>
                    <li><a href="instagram.com/chaptype">instagram</a></li>
                    <li><a href="github.com/astrojose/chaptype">github</a></li>
                </ul>
            </div>
            <div className="copyright">
                <p> &copy; <a href="/">Chapatype</a>, 2021</p>
            </div>
        </footer>
    )
}

export default Footer

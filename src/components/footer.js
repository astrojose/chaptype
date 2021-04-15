import React from 'react'


const Footer = () => {
    return (
        <footer>
            <div className='links'>
                <ul>
                    <li><a href="https://instagram.com/chaptyp">instagram</a></li>
                    <li><a href="https://github.com/astrojose/chaptype">github</a></li>
                </ul>
            </div>
            <div className="copyright">
                <p> &copy; <a href="/">chaptyp</a>, {new Date().getFullYear()}</p>
            </div>
        </footer>
    )
}

export default Footer

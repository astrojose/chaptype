import React from 'react'

const Navbar = () => {
    return (
        <div className="top-nav">
            <div className="logo">
                <a href="/">chaptyp</a>
            </div>

            <nav className="nav">
                <ul className="nav-links">
                    <li><a href="#">learn</a></li>
                    <li><a href="#">locale</a></li>
                    <li><a href="#">login</a> </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;

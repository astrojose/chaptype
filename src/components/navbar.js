import React from 'react'

const Navbar = () => {
    return (
        <div className="top-nav">
            <div className="logo"> 
                <a href="/">ChapType</a> 
            </div>
            
            <nav className="nav">
                <ul className="nav-links">
                    <li><a href="#">Lessons</a></li>
                    <li><a href="#">English</a></li>
                    <li><a href="#">user</a> </li>
                </ul>
            </nav>
        </div>
    ) 
}

export default Navbar;
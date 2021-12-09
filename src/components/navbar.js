import React from 'react'
import { NavLink } from 'react-router-dom';


const Navbar = () => {
    return (
        <div className="top-nav">
            <div className="logo">
                <NavLink to='/' className='primary'>chaptyp.club</NavLink>
            </div>

            <nav className="nav">
                <ul className="nav-links">
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;

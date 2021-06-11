import React from 'react'
import { NavLink, useLocation } from 'react-router-dom';


const Navbar = () => {
    let location = useLocation();
    const { pathname } = location;

    const splitLocation = pathname.split("/");

    return (
        <div className="top-nav">
            <div className="logo">
                <NavLink to='/' className='primary'>chaptyp.club</NavLink>
            </div>

            <nav className="nav">
                <ul className="nav-links">
                    <li>
                        <NavLink to='/tips' className='primary'>Tips</NavLink></li>
                    <li>
                        <NavLink to='/about' className='primary'>About</NavLink></li>
                    <li>
                        <NavLink to='/user' className='primary'>User</NavLink></li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;

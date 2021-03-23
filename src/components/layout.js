import React from 'react'
import Footer from './footer'
import Navbar from './navbar'


const Layout = (props) => {
    return (
        <div className="App">
        <header className="App-header">
            <Navbar />
        </header>
          {props.children}
        <Footer />
    </div>
    )
}

export default Layout

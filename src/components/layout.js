import React from 'react'
import { Route, Switch } from 'react-router'
import Footer from './footer'
import Navbar from './navbar'
import Tips from '../pages/tips'
import About from '../pages/about'
import User from '../pages/user'
import Welcome from './welcome'


const Layout = (props) => {
    return (
        <div className="App">
        <header className="App-header">
            <Navbar />
            <Switch>
                <Route exact path="/" component={Welcome} />
                <Route exact path='/tips' component={Tips} />
                <Route exact path='/about' component={About} />
                <Route exact path='/user' component={User} />
            </Switch>
        </header>
          {props.children}
        <Footer />
        
    </div>
    )
}

export default Layout

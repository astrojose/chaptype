import React from 'react'
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import './styles/App.css'
import Layout from './components/layout'
import TypingGame from './pages/TypingGame'
import Home from './pages/Home'

function App(props) {
  return (
      <Layout>
        <Router>
                {/* <Route path="/" component={MainGame} /> */}
                <Switch>
                <Route path='/'>
                    <Route exact path='/' component={Home} />

                    <Route
                      path='/typing-test'
                      exact
                      render={(routerProps) => (
                        <TypingGame {...routerProps}/>
                      )}
                    />
                </Route>
                </Switch>
          </Router>
      </Layout>
  )
}

export default App;

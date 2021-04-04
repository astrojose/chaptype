import React from 'react'
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import './styles/App.css'
import Layout from './components/layout'
import TypingGame from './pages/TypingGame'

function App(props) {
  return (
      <Layout>
	  <TypingGame />
      </Layout>
  )
}

export default App;

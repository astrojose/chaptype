import './styles/App.css'
import Welcome from "./components/welcome"
import Layout from './components/layout'
import TypingGame from './pages/TypingGame'

function App() {
  return (
      <Layout>

        <TypingGame />

      </Layout>
  )
}

export default App;

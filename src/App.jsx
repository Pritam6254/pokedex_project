import { Link } from 'react-router-dom'
import './App.css'
import CustomRoutes from './routes/CustomRoutes'

function App() {
 

  return (
    <div className='pokemon-header-wrapper'>
      <Link to="/"><h1 className='pokemon-heading'>Pokedex</h1></Link>
      <CustomRoutes />
    </div>
  )
}

export default App

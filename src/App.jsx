import { Route, Routes } from 'react-router-dom'
import Home from './components/pages/home'
import Details from './components/Details/Details'

const App = () => {
  return (
   <>
   <Routes>
    <Route  path='/' element={<Home/>}/>
    <Route  path='/details' element={<Details/>}/>
   </Routes>
   </>
  )
}

export default App
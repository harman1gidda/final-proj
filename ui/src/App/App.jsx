import { Routes, Route } from 'react-router-dom'
import Home from '../Home/Home'
//import AllItems from '../AllItems/AllItems'
//import Submit from '../Submit/Submit'
import Navbar from '../Navbar/Navbar'
import NotFound from '../NotFound/NotFound'
import './App.css'

function App() {


  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path='/AllItems' element={<AllItems />} /> */}
        {/* <Route path='/submit' element={<Submit />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <div className='footer'>
        <h3> Final Project</h3>
        <p id="footerP">Authors: Harman Gidda</p>
      </div>
    </>
  )
}

export default App

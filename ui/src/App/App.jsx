import { Routes, Route } from 'react-router-dom'
import Home from '../Home/Home'
import AllItems from '../AllItems/AllItems'
//import Submit from '../Submit/Submit'
import Navbar from '../Navbar/Navbar'
import NotFound from '../NotFound/NotFound'
import Login from '../Login/Login'
import Signup from '../Signup/Signup'
import ItemDetails from '../ItemDetails/ItemDetails'
import EditItem from '../EditItem/EditItem'
import './App.css'

function App() {

  const isAuthenticated = localStorage.getItem('session_id');

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/item' element={<AllItems />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path="/item/:id" element={isAuthenticated ? <ItemDetails /> : <AllItems />} />
        <Route path="/edit/:id" element={isAuthenticated ? <EditItem /> : <AllItems />} />
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

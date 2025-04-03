import { Routes, Route } from 'react-router-dom'
import Home from '../Home/Home'
import AllItems from '../AllItems/AllItems'
import MyItems from '../MyItems/MyItems';
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import NotFound from '../NotFound/NotFound'
import Login from '../Login/Login'
import Logout from '../Login/Logout'
import Signup from '../Signup/Signup'
import './App.css'

function App() {

  const isAuthenticated = localStorage.getItem('session_id');
  const username = localStorage.getItem('username');

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} username = {username}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/item' element={<AllItems />} />
        <Route path="/my-items" element={isAuthenticated ? <MyItems /> : <Home />} />
        <Route path="/my-items" element={isAuthenticated ? <AllItems /> : <Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App

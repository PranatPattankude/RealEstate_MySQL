import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserHome from './UserPanel/UserHome'
import {Route, BrowserRouter as Router, Routes ,Navigate} from 'react-router-dom'
import Footer from './Components/Footer'
import Login from './Components/Login'
import Registration from './Components/Registration'
import AdminPassReset from './Components/AdminPassReset'
import AdminHome from './AdminPanel/AdminHome'
import UserProvider from "./UserPanel/UserContext/userContext";
import SellerHome from './SellerPanel/SellerHome'


function App() {

  return (
    <>
   <Router>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/LoginPage" />} />
            <Route path="/LoginPage" element={<Login />} />
            <Route path="/Registration" element={<Registration />} />
            <Route path="/AdminPassReset" element={<AdminPassReset />} />
            <Route path="/AdminHome/*" element={<AdminHome />} />
            <Route path="/UserHome/*" element={<UserHome />} />
            <Route path="/SellerHome/*" element={<SellerHome />} />
          </Routes>
          {/* <Footer /> */}
        </UserProvider>
      </Router>

   
    </>
  )
}

export default App

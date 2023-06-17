import React from 'react'
import Navbar from "../Navbar/Navbar.jsx"
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../Footer/Footer.jsx'
export default function Layout({setUserData}) {
  let navigate = useNavigate();
  function logOut() {
    localStorage.removeItem("token");
    setUserData(null);
    navigate("/login")
  }
  return <>
    <Navbar logOut={logOut}/>
  <Outlet></Outlet>
  <Footer/>
  </>
}

import React, { useEffect, useState } from 'react'
import Layout from './Components/Layout/Layout.jsx'
import { RouterProvider, createBrowserRouter, useNavigate, useNavigation } from 'react-router-dom'
// import Home from './Components/Home/Home.jsx'
// import Medicine from './Components/Medicines/Medicines.jsx'
// import Profile from './Components/Home/Home.jsx'
import Wishlist from './Components/Wishlist/Wishlist.jsx'
import { MedicineStoreProvider } from './Context/MedicineContext.jsx'
import MedicineDetails from './Components/MedicineDetails/MedicineDetails.jsx'
import MedicineType from "./Components/MedicineType/MedicineType.jsx"
import Home from './Components/Home/Home.jsx'
import Register from './Components/Register/Register.jsx'
import Login from './Components/Login/Login.jsx'
import ForgetPassword from './Components/User/ForgetPassword.jsx';
import ResetPassword from './Components/User/ResetPassword.jsx';
import WishListStoreProvider from './Context/WishListContext.jsx'
import CartStoreProvider from './Context/CartContext.jsx'
import OrderStoreProvider from './Context/OrderContext.jsx'
import Cart from './Components/Cart/Cart.jsx'
import Order from './Components/Order/Order.jsx'
import AddMedicine from './Components/AddMedicine/AddMedicine.jsx'
import Profile from './Components/Profile/Profile.jsx'
import UpdateProfile from './Components/Profile/UpdateProfile.jsx'
import { ToastContainer, toast } from 'react-toastify';
import Success from './Components/Success/Success.jsx'
import ProfileStoreProvider from './Context/ProfileContext.jsx'
import ProtectedRoute from './Components/ProductRoute/ProdectedRoute.jsx'
import SharedProfile from './Components/SharedProfile/SharedProfile.jsx'
import jwtDecode from 'jwt-decode'

export default function App() {
  let [userData, setUserData] = useState(null)
  function saveUserData() {
    let encryption = localStorage.getItem("token");
    let decryption = jwtDecode(encryption);
    setUserData(decryption);
    console.log(decryption);
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      saveUserData();
    }
  }, [])


  let routes = createBrowserRouter([
    {
      path: "/", element: <Layout setUserData={setUserData}/>, children: [
        { path: "/home", element: <Home /> },
        { index: true, element: <Register /> },
        { path: "/login", element: <Login /> },
        { path: "/profile", element: <ProtectedRoute><Profile /></ProtectedRoute> },
        { path: "/profile-update", element: <ProtectedRoute>< UpdateProfile /></ProtectedRoute> },
        { path: "/forgot-password", element: <ForgetPassword /> },
        { path: "/reset-password", element: <ResetPassword /> },
        { path: "/addmedicines", element: <ProtectedRoute> <AddMedicine /></ProtectedRoute> },
        { path: "/medicine/:type", element: <Home /> },
        { path: "/medicinedetails/:id", element: <ProtectedRoute> <MedicineDetails /></ProtectedRoute> },
        { path: "/home", element: <WishListStoreProvider><Home /></WishListStoreProvider> },
        { path: "/wishlist", element: <ProtectedRoute><Wishlist /></ProtectedRoute> },
        { path: "/cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: "/order", element: <ProtectedRoute><Order /></ProtectedRoute> },
        { path: "/success", element: <Success /> },
        { path: "/shared-profile/:id", element: <SharedProfile /> },


      ]
    }
  ])


  return <>
    <ToastContainer theme='colored' />
    <ProfileStoreProvider>
      <WishListStoreProvider>
        <CartStoreProvider>
          <OrderStoreProvider>
            <MedicineStoreProvider>
              <RouterProvider router={routes} />
            </MedicineStoreProvider>
          </OrderStoreProvider>
        </CartStoreProvider>
      </WishListStoreProvider>
    </ProfileStoreProvider>

  </>


}

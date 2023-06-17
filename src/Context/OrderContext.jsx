import { createContext, useContext, useEffect, useState } from "react"
import { baseUrl } from "../Utils/axios.js";
import axios from "axios";
import { cartStore } from "./CartContext.jsx";
import { toast1 } from "../Utils/notify.js";





 export let  orderStore = createContext([])

 export default function OrderStoreProvider({children}){
    const [order, setOrder] = useState({})
    let {setCount, count , getFromCart}= useContext(cartStore)
    
    useEffect(()=>{getFromCart()},[count])

    async function createOrder(address,phone,paymentType,token)
    {
     
        let data = await axios.post(`${baseUrl}/order/createOrder`,{address,phone:phone,paymentType},{headers:{authorization:token}})
        if(data.status==201)
        {
          if(data?.data?.Url)
          {
            setTimeout(()=>{
              window.location.href = data.data.Url
            },[4000])
          }
           toast1("Order is Created","info")
         setCount(0)
         setOrder(data?.data)
        }
    }
    console.log({order});
       return (<>
       
    <orderStore.Provider value={{createOrder ,order}}>{children}</orderStore.Provider>
    
    </>)

 }

 
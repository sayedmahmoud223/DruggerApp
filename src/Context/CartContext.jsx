import { createContext, useEffect, useState } from "react";
import {  baseUrl } from "../Utils/axios.js";
import axios from "axios";
import { toast1 } from "../Utils/notify.js";

 export let  cartStore = createContext([])

 export default function CartStoreProvider({children}){
    const [cartMedicine, setCartMedicine] = useState([])
    const [showMedicine,setShowMedicine ] = useState([])
    const [price,setPrice ] = useState(1)
    const [count,setCount ] = useState(0)

/******************************************************************************************** */
  async function getFromCart()
  {
    let token = localStorage.getItem("token")

      let data = await axios.get(`${baseUrl}/cart/getAllProducts`,{headers:{authorization:token}})
      console.log("hallo1");
      setShowMedicine(data.data.productList)
      console.log("hallo2");
      setPrice(data.data.totalPrice)
      console.log("hallo3");
      setCount(data.data.count)  
  }
 console.log({showMedicine});
   /************************************************************************* */
    async function AddProductToCart(medicineId){
        let token = localStorage.getItem('token')
        await axios.post(`${baseUrl}/cart`,{medicineId},{headers:{authorization:token}})
        .then((data)=>{
             //console.log({Add:data});
             toast1(" Medicine is added to Cart","info")
             
            if(data.status ==200)
            {
                setCount(data.data.count)
                setCartMedicine(data.data.Cart.products)
            }
        }).catch((err)=>{
            //console.log({err});
        })
       
      
    } 
  /**************************************************************************************** */
 
  async  function deleteItem(medicineId)
  {
    let token = localStorage.getItem("token")
    let data = await axios.patch(`${baseUrl}/cart/clearSelectItems`,{medicineId} ,{headers:{authorization:token}})
    setCount(data.data.Cart.products.length)
    setShowMedicine(data.data.Cart.products)
    toast1("Medicine is deleted","info")
  }
  
  async function clearALLCart ()
  {
    let token = localStorage.getItem('token')
    await axios.put(`${baseUrl}/cart/clearAll`,{},{headers:{authorization:token}}).then((data)=>{
        toast1("All Items Are Deleted From Cart","info")
    })
   setCount(0)
   
  }
  /********************************************************************************************** */
  async function consumecount(medicineId,quantity)
  {
    let token = localStorage.getItem("token")
    if(quantity<1)
    {
      quantity=1
    }
    let data = await axios.patch(`${baseUrl}/cart/updateQuantity/${medicineId}`,{quantity},{headers:{authorization:token}})
    setShowMedicine(data?.data?.updateCart?.products)
    setPrice(data?.data?.totalPrice)
    setCount(data?.data?.count)
  }
  useEffect(()=>{
    getFromCart()
  },[count])
    return (<>
    <cartStore.Provider value={{ AddProductToCart,clearALLCart , cartMedicine,getFromCart ,showMedicine,deleteItem , count ,consumecount , price ,setCount}}>{children}</cartStore.Provider>
    </>)
 }
 

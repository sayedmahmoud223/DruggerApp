import { createContext, useEffect, useState } from "react";
import { baseUrl } from "../Utils/axios.js";
import axios from "axios";
 import { toast1 } from "../Utils/notify.js";

export let wishListStore =createContext([])


export  default  function  WishListStoreProvider({children})
{
const [wishList, setWishList] = useState([])
const [first, setfirst] = useState(false)
    async function addToWishList(id)
    {
        let token = localStorage.getItem('token')
       let {data} =  await axios.patch(`${baseUrl}/medicine/${id}/wishList`,{},{headers:{authorization:token}})
         setfirst(true)
        //  console.log({data});
        //  setWishList(data.data.result.wishlist)
        toast1("Added To WishList","info")
    }
    async function getWishList()
    {
        let token = localStorage.getItem('token')
        let data = await axios.get(`${baseUrl}/phar/userProfile`,{headers:{authorization:token}})
        setfirst(false)

        setWishList(data.data.result.wishlist)
    }

    async function removeFromWishList(id)
    {

            let token = localStorage.getItem('token')
          let data = await axios.patch(`${baseUrl}/medicine/${id}/removeWishList`,{},{headers:{authorization:token}})
          setfirst(true)
          console.log({removeData:data});
          toast1("item is removed...","warning")
    }
    useEffect(()=>{getWishList()},[first])
 return  <wishListStore.Provider value={{addToWishList , getWishList ,removeFromWishList , wishList,first}} > {children} </wishListStore.Provider>
}




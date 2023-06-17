import { createContext, useEffect, useState } from "react";
import { baseUrl } from "../Utils/axios.js";
import axios from "axios";




export let  profileStore  =createContext([])


export  default  function ProfileStoreProvider({children})
{
    const [profile, setProfile] = useState([]);
    async function getUser() {
    let token = localStorage.getItem("token");
    let data = await axios.get(`${baseUrl}/phar/userProfile`, {
        headers: { authorization: token },
    });
    setProfile(data?.data.result);
    }

    
    useEffect(()=>{getUser()},[])
   
    const [profile1, setProfile1] = useState([]);
    const [profileMedicine, setProfileMedicine] = useState([]);
    async function getUser1(id) {
          
      let data = await axios.get(`${baseUrl}/phar/${id}/shareProfile`);
      console.log({shared:data.data});
      setProfile1(data.data.user);
      setProfileMedicine(data.data.medicinies);
     
    }




 return  <profileStore.Provider value={{getUser ,getUser1, profile ,profile1,profileMedicine }} > {children} </profileStore.Provider>


}
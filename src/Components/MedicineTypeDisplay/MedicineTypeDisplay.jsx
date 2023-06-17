import React, { useContext, useEffect, useState } from 'react'
import { MedicineStore } from '../../Context/MedicineContext.jsx'
import moment from 'moment'
import { Link, useParams } from 'react-router-dom'
import { cartStore } from '../../Context/CartContext.jsx'
import HomeSlider from '../HomeSlider/HomeSlider.jsx'
import { wishListStore } from '../../Context/WishListContext.jsx'
export default function MedicineTypeDisplay() {
  let { fetchData, data, selectedFilters, setSelectedFilters, handleFilterChange } = useContext(MedicineStore)
  let { AddProductToCart } = useContext(cartStore)
  
  let {wishList, removeFromWishList ,addToWishList ,getWishList, first} = useContext(wishListStore)
  console.log({wishList});
  useEffect(()=>{
 
    if(wishList.length ==0)
    {
      getWishList()
    }
   
  },[first , wishList])

  return <>
    {/* <HomeSlider/> */}
    {data?.data?.medicines?.map((item) => {
      return <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 mt-5 product ' key={item._id}>
        <div className='bg-white rounded-5'>
          <Link to={`/medicinedetails/${item._id}`}>
            <div className='main-height mb-2'>
              <img className='w-100 h-100' src={item.medicineImage} />
            </div>
          </Link>
          <div className='p-2 redu minHeight'>
            <p className='text-main'>Name: {item.medicineName.split(" ").slice(0, 3)}</p>
            <p className='text-main'>Type: {item.medicineType}</p>
            {/* <p className='text-main'>Price: {item.medicineUnitPrice} EGP</p> */}
            <div className="d-flex justify-content-between align-items-center">
            <p>UnitPrice: {item.medicineUnitPrice}</p>
            
            {wishList.some(obj => obj._id === item._id)?<i onClick={()=>{removeFromWishList(item._id)}} className="fa-solid fa-heart text-danger"></i> : <i onClick={()=>{addToWishList(item._id)}} className="fa-regular fa-heart "></i> }
           
        
            </div>

            <p className='text-main'>Exp Date: {moment(item.medicineExpireDate).format("MM-DD-YYYY")}</p>
          </div>
          <button type="button" onClick={() => { AddProductToCart(item._id) }} className="btn text-light w-100 bg-fifth">Add To Cart</button>
        </div>
      </div>

    })}

  </>
}

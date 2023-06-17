import React, { useContext, useEffect } from 'react'
import { wishListStore } from '../../Context/WishListContext.jsx'
import moment from 'moment';
import { Link } from 'react-router-dom';
import { cartStore } from '../../Context/CartContext.jsx';

export default function Wishlist() {
  let  {wishList,removeFromWishList,getWishList} = useContext(wishListStore)
  
  let  {AddProductToCart} = useContext(cartStore)
 useEffect(()=>{ getWishList()},[])
  console.log(wishList);

  return (
    <>
    {wishList.length==0 ? <>
    <div className="container  ">
      <div className="d-flex justify-content-center align-items-center um py-5">
        <p className='fs-1 text-main rounded-4 shadow py-4 px-5'>WishList Is Empty </p>
      </div>
    </div>
    </>:  <div className='container my-5  ' >
        <div className=" row">
    
       {wishList.map((item) => {
      return <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 mt-5 product' key={item._id}>
        <div className='bg-white border-redius'>
          <Link to={`/medicinedetails/${item._id}`}>
            <div className='main-height mb-2'>
              <img className='w-100 h-100' src={item.medicineImage} alt='' />
            </div>
          </Link>
          <div className='p-2 redu minHeight'>
            <p>Name: {item.medicineName.split(" ").slice(0, 3)}</p>
            <p>Type: {item.medicineType}</p>
           <div className="d-flex justify-content-between align-items-center">
           <p>UnitPrice: {item.medicineUnitPrice}</p>
           <i onClick={()=>{removeFromWishList(item._id)}} className="fa-solid fa-heart text-danger"></i>

           </div>
            <p>Expire At: {moment(item.medicineExpireDate).format("MM-DD-YYYY")}</p>
          </div>
          <button type="button" onClick={()=>{AddProductToCart(item._id)}} className="btn text-light w-100 bg-fifth">Add To Cart</button>
        </div>
      </div>

    })}
        </div>
      </div>}
    
    
     
     

  
      

    </>
  )
}

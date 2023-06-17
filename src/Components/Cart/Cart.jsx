
import React, { useContext, useEffect, useState } from 'react'
import { cartStore } from '../../Context/CartContext.jsx'
import { Link } from 'react-router-dom';

export default function Cart() {
    const [render, setrender] = useState(false)
    let {showMedicine,deleteItem,getFromCart,consumecount,price ,count,clearALLCart }= useContext(cartStore)
     let i = 1;
     useEffect(()=>{getFromCart() ;  },[price,count, render])

  return (
    <>
    <div className='color-box  p-5  rounded-3 ' >   

     <h3 className='maincartColor text-center'>My Shopping Cart</h3>

   <div className=" bg-white py-5 my-5 m-auto  rounded-4 shadow">
                    
                    <div>
                     
            <table className='table text-center'>
                <thead>
                    <tr>
                        
                        <th scope="col">Image </th>
                        <th scope="col">Name</th>
                        <th  scope="col">Quantity</th>
                        <th scope="col">Price</th>
                        <th scope="col">Delete</th>

                    </tr>
                </thead>
                {console.log(showMedicine)}
                { showMedicine?.map((ele, ind) =>
                // {console.log()}
                    <tbody key={ind}>
                        <tr className='tr1'>
                            <td> <img className='' height={"65"}   src={ele.medicineId.medicineImage} alt='' /> </td>
                                <td> <p className=''>{ele.medicineId.medicineName}</p> </td>
                            <td  >
                                <div className='d-flex justify-content-center align-items-center '>
                                <span  onClick={()=>{consumecount(ele.medicineId._id, ele.quantity+1) ; setrender(true)}} className=' d-flex justify-content-center align-items-center border border-1 p-3 div-size '> <i className="fa-duotone fa-plus fa-xl "></i></span>
                                <span className='  d-flex justify-content-center align-items-center border border-1  p-3'>{ele.quantity}</span>
                                <span onClick={()=>{consumecount(ele.medicineId._id, ele.quantity-1); setrender(true)}} className='  d-flex justify-content-center align-items-center  border border-1 p-3 div-size '> <i className=" fa-solid fa-minus"></i></span> 
                                </div>
                               
                            </td>
                            <td>  {ele?.medicineId?.medicineUnitPrice} EGP</td>
                            <td>
                                <i  onClick={()=>{deleteItem(ele.medicineId._id); }} className="fa-solid fa-trash  text-danger"></i>
                            </td>
                        </tr>
                    </tbody>
    
                )}
                   
            </table>
            <div className='mx-5 py-4 border-bottom border-1'>
                          <div className="container mx-5">
                           <div className='row mt-3 d-flex justify-content-center align-items-center '>

                              
                                <div className="col-md-3 "><div className='rounded-3 shadow border border-1 d-flex justify-content-around align-items-center size-cart-footer size-cart-footer'>
                                    <p className=''>SubTotal</p>
                                    <span>{price ? price:"0.00"} EGP</span>
                                     </div></div>
                                <div className="col-md-3"><div className=' rounded-3 shadow border border-1 d-flex justify-content-around align-items-center size-cart-footer size-cart-footer'>
                                    <p className=''>Total</p>
                                    <span>{price ? price: "0.00" } EGP</span>
                                     </div></div>

                            </div>
                           </div>
                          </div>

                         <div className='d-flex justify-content-end align-items-center'>
                         <div className='d-flex justify-content-end align-items-center  '>
                          <button onClick={()=>{clearALLCart()}} className=' btn main-cart-bg mt-3  mx-2 px-3 main-cart-bg'>Clear ALL Cart</button>
                          </div>
                          <div className='d-flex justify-content-end align-items-center  '>
                          <Link to={"/order"}><button  className=' btn main-cart-bg mt-3  me-5 px-3 main-cart-bg'>Create Order</button></Link>
                          </div>
                         </div>
                        
                    </div>
        </div>
  </div>
    
    
    
  
   
    </>
  )
}

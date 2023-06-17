import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { baseUrl } from "../../Utils/axios.js";
import { orderStore } from "../../Context/OrderContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import { cartStore } from "../../Context/CartContext.jsx";


export default function Order() {
  const [loading, setLoading] = useState(false);



  
  let {showMedicine,getFromCart,price ,count }= useContext(cartStore)
let navgiate = useNavigate()
  useEffect(()=>{getFromCart() },[price,count])
  
  let { createOrder, order } = useContext(orderStore);

  let validate = (values) => {
    let errors = {};

    if (!values.address) {
      errors.address = "address is required ";
    } else if (!/^[a-zA-Z0-9\s,'-]*$/i) {
      errors.email = "invalid address ";
    }
    console.log({order});
    if (!values.phone) {
      errors.phone = "phone is required ";
    }
    if (!values.paymentType) {
      errors.paymentType = "payment is required";
    }
    return errors;
  };
  let orderFormik = useFormik({
    initialValues: {
      address: "",
      phone: "",
      paymentType: "",
    },
    validate,
    onSubmit: async (values) => {
      setLoading(true);
      console.log(values);
      let token = localStorage.getItem("token");
      await createOrder(
        values.address,
        [values.phone],
        values.paymentType,
        token
      ).then((data)=>{
      console.log({inpage:data});
      }).catch((err)=>{
       console.log({err});
      })
    },
  });

  console.log(orderFormik.errors);
  console.log(orderFormik.values);
  console.log(order._id);
  return (
    <>
      <div className="d-flex justify-content-center align-items-center my-5 py-5">
        <div className="w-50">
          <form action="" onSubmit={orderFormik.handleSubmit}>
            <label htmlFor="">Address</label>
            <input
              value={orderFormik.values.address}
              onChange={orderFormik.handleChange}
              type="text"
              onBlur={orderFormik.handleBlur}
              className="form-control my-3 border border-bottom"
              name="address"
              id="address"
            />
            {orderFormik.errors.address && orderFormik.touched.address ? (
              <div className="alert alert-primary">
                {orderFormik.errors.address}
              </div>
            ) : null}
            <label htmlFor="">Phone</label>
            <input
              value={orderFormik.values.phone}
              onChange={orderFormik.handleChange}
              type="text"
              onBlur={orderFormik.handleBlur}
              className="form-control my-3 border border-bottom"
              name="phone"
              id="phone"
            />
            {orderFormik.errors.phone && orderFormik.touched.phone ? (
              <div className="alert alert-primary">
                {orderFormik.errors.phone}
              </div>
            ) : null}

            <div className="d-flex   align-items-center my-5">
              <label className="me-5">Payment Type</label>
              <div className="d-flex justify-content-center align-items-center ">
                <div className="form-check form-check-inline mx-5">
                  <input
                    onChange={orderFormik.handleChange}
                    type="radio"
                    name="paymentType"
                    id="COD"
                    value="COD"
                    className="mx-2"
                  />
                   <i class="fa-solid fa-sack-dollar"></i> Cash
                  <br />
                </div>
                <div className="form-check form-check-inline ">
                  <input
                    onChange={orderFormik.handleChange}
                    type="radio"
                    name="paymentType"
                    id="Card"
                    value="Card"
                    className="mx-2"
                  />
                  <i class="fa-brands fa-cc-visa"></i> Card
                  <br />
                </div>
              </div>
            </div>
            {orderFormik.errors.paymentType &&
            orderFormik.touched.paymentType ? (
              <div className="alert alert-primary">
                {orderFormik.errors.paymentType}
              </div>
            ) : null}

            <div className="w-100 border border-1 "></div>
            <div className="d-flex justify-content-end align-content-center">
              <button
                type="submit"
                className=" btn main-cart-bg mt-5  mx-1 px-3 float-end"
                disabled={  (order.Url || order.result)}
              >
                <Link className="text-decoration-none text-black" to={"/cart"}> Cancel </Link>
                
              </button>



              <button onClick={async()=>{ 
                    if(order?.result)
                    {
                     setTimeout(()=>{
                       navgiate("/success")
                     },[4000])
                    }

                }
              } disabled={!order  } type='submit' className=' btn main-cart-bg mt-5  mx-1 px-3 float-end'> CHECK OUT </button>

              


            </div>
           
          </form>
        </div>
      </div>
    </>
  );
}

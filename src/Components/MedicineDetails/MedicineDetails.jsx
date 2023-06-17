import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MedicineStore } from '../../Context/MedicineContext.jsx';
import Slider from 'react-slick';
import moment from 'moment';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { baseUrl } from '../../Utils/axios.js';
import { Formik, useFormik } from 'formik';
import { cartStore } from '../../Context/CartContext.jsx';



export default function MedicineDetails() {
  let [first, setFirst] = useState(false)
  let addComment = useFormik({
    initialValues: {
      commentDesc: ""
    },
    onSubmit: async (values) => {
      setFirst(true)
      await axios.post(`${baseUrl}/medicine/${id}/comments`, values, { headers: { authorization: token } }).then((res) => {
        return res
      }).catch((err) => { return err })
    }

  })
  let { GetSpecifcMedicine, SpecifcMedicine } = useContext(MedicineStore)
  const token = localStorage.getItem("token"); // Replace with your actual token
  let decodedToken;
  if (token) {
    decodedToken = jwt_decode(token);
  }
  let { id } = useParams();
  let { AddProductToCart } = useContext(cartStore)
  useEffect(() => {
    GetSpecifcMedicine(id)

    if (first == true) {
      GetSpecifcMedicine(id)
      setFirst(false)

    }
  }, [first])
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return <>
    {SpecifcMedicine ?
      <div className="container p-3">
        <div className="row g-4">
          <div className="col-md-8 ">
            <Slider {...settings}>
              <div>
                <img className='w-100 ' height={400} src={SpecifcMedicine?.medicine?.medicineImage} />
              </div>
            </Slider>
            <div className="container bg-white border my-4 p-2 rounded-4 shadow-4">
              {/* <div className="d-flex justify-content-between align-items-center"> */}
              <div className='style'>
                <h1 className='text-main'>Price: <span className='text-main'>{SpecifcMedicine?.medicine?.medicineUnitPrice} EGP</span></h1>
                <div className="d-flex w-75 justify-content-between">
                  <div>
                    <h5 className='text-main'>MedicineType: {SpecifcMedicine?.medicine?.medicineType}</h5>
                  </div>
                  <div>
                    <h5 className='text-main '>Name: <span className='text-main'>{SpecifcMedicine?.medicine?.medicineName}</span></h5>

                  </div>
                </div>
                <div className='d-flex justify-content-between align-items-center w-75'>
                  <h6 className='text-main'>Stock: {SpecifcMedicine?.medicine?.medicineStock}</h6>
                  <i className="fa-regular fa-heart"></i>
                </div>
                <h6 className='text-third'>Expired at: {moment(SpecifcMedicine?.medicine?.medicineExpireDate).format("MM-DD-YYYY")}</h6>
                <h6 className='text-main'>Address: {SpecifcMedicine?.medicine?.createdBy?.address ? SpecifcMedicine?.medicine?.createdBy?.address : ""} <i class="fa-solid fa-location-dot"></i></h6>
                <button onClick={() => { AddProductToCart(SpecifcMedicine?.medicine?._id) }} className='btn bg-main text-white w-100'>Add to Cart</button>
              </div>
            </div>

            <div className="container bg-white border my-4 p-2 rounded-4 shadow-4">
              {/* <div className="d-flex justify-content-between align-items-center"> */}
              <div className='style'>
                <h1 className='text-main'>Description</h1>
                <p className='p-3'>{SpecifcMedicine?.medicine?.medicineDesc}</p>

                {/* </div> */}
              </div>
            </div>

            <div className="container bg-white border my-4 p-2 rounded-4 shadow-4">
              {/* <div className="d-flex justify-content-between align-items-center"> */}
              <div className='style'>
                <h1 className='text-main'>Comments</h1>
                {
                  SpecifcMedicine?.medicine?.comments?.map((ele) => {
                    return <>
                      {ele?.createdBy?._id == decodedToken.id ? <div>
                        <div className='ms-auto bg-main w-50 my-2 p-1 rounded-4 shadow '>
                          <div className='d-flex'>
                            <div className='vvv'>
                              {ele?.createdBy?.profileURL ? <img height={30} className='w-100 rounded-circle' src={ele.createdBy.profileURL} /> : <img height={30} className='w-100' src="https://res.cloudinary.com/dg0pspgi1/image/upload/v1684470629/DruggerApp/logo/profile_ty1kyw.png" />}
                            </div>
                            <div>
                              <p className='text-white p-1 '>{ele?.createdBy?.pharName}</p>
                            </div>
                          </div>
                          <p className='text-white d-block p-1 px-4'>{ele?.commentDesc}</p>
                          <div className='d-flex'>
                            <div className='ms-auto'>
                              <p className='text-white p-1 time'>{moment(ele?.createdAt).fromNow()}</p>
                            </div>
                          </div>
                        </div>

                      </div>
                        : <div>
                          <div className='me-auto bg-secondary w-50 my-2 p-1 rounded-4 shadow '>
                            <div className='d-flex'>
                              <div className='vvv'>
                                {ele?.createdBy?.profileURL ? <img height={30} className='w-100 rounded-circle' src={ele.createdBy.profileURL} /> : <img height={30} className='w-100' src="https://res.cloudinary.com/dg0pspgi1/image/upload/v1684470629/DruggerApp/logo/profile_ty1kyw.png" />}
                              </div>
                              <div>
                                <p className='text-white p-1 '>{ele?.createdBy?.pharName}</p>
                              </div>
                            </div>
                            <p className='text-white d-block p-1 px-4'>{ele?.commentDesc}</p>
                            <div className='d-flex'>
                              <div className='ms-auto'>
                                <p className='text-white p-1 time'>{moment(ele?.createdAt).fromNow()}</p>
                              </div>
                            </div>
                          </div>

                        </div>
                      }

                    </>

                  })}
                <form onSubmit={addComment.handleSubmit}>
                  <div class="input-group my-3">
                    <div class="input-group-prepend">
                      <button class="btn text-white bg-main" type="submit">Comment</button>
                    </div>
                    <input type="text" id='clear' value={addComment.values.commentDesc} onBlur={addComment.handleBlur} onChange={addComment.handleChange} name='commentDesc' className="form-control border out border-2" placeholder aria-label aria-describedby="basic-addon1" />
                  </div>
                </form>
              </div>
            </div>

          </div >
          <div className="col-md-4">
            <div className="container bg-white border p-2 rounded-4 shadow-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className='text-main'>mobile phone</h5>
                  <div className='p-2'>
                    <p>{SpecifcMedicine.medicine?.createdBy?.phone ? SpecifcMedicine.medicine?.createdBy?.phone : ""}</p>
                    {/* <button className='btn mt-2 bg-main text-white'>User Profile</button> */}
                    <Link to={`/shared-profile/${SpecifcMedicine?.medicine?.createdBy?._id}`}><button  className='btn mt-2 bg-main text-white'>User Profile</button></Link>

                  </div>
                </div>
                <div>
                  <i className="fa-solid fa-phone-flip text-main fa-2xl"></i>
                </div>
              </div>
            </div>
            {/*  */}
            <div className="container bg-white border my-4 p-2 rounded-4 shadow-4">
              <div className="d-flex justify-content-between align-items-center ">
                <div className='style'>
                  <h3 className='text-main'>Your safety matters to us!</h3>
                  <p>1- Only meet in public / crowded places for example metro stations and malls.</p>
                  <p>2- Never go alone to meet a buyer / seller, always take someone with you.</p>
                  <p>3- Check and inspect the product properly before purchasing it.</p>
                  <p>4- Never pay anything in advance or transfer money before inspecting the product.</p>
                </div>
              </div>
            </div>
          </div>
        </div >
      </div>
      : ""
    }
  </>
}






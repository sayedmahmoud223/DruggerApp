import React from 'react'
import { Link } from 'react-router-dom'
import img from '../../img/Done.jpg'
export default function Success() {
  return (
    <div className='container d-flex justify-content-center align-items-center my-5 py-5  vh-100'>
        <div className='d-flex justify-content-center align-items-center '>
            <div className=' my-5 rounded-4 shadow bg-white px-5 '>

            {/* <i class="fa-solid text-success fa-thumbs-up fs-1 text-center "></i> */}
                <img src={img} className='w-100' alt="" />
            <p className='text-success my-5 text-center'>Order shipped successfully </p>

            <Link className='d-flex justify-content-center align-items-center' to="/home">  <button className='btn btn-primary px-5 mx-5 my-5  m-auto'> OK </button></Link>


            </div>
        </div>
    </div>
  )
}

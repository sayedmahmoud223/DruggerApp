import React from 'react'
import Sidebar from '../Sidebar/Sidebar.jsx'
import MedicineType from '../MedicineType/MedicineType.jsx'
import HomeSlider from '../HomeSlider/HomeSlider.jsx'

export default function Home() {
  return <>
    <div className="container-fluid">
      <div className="row">
        <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-2 p-0">
          <Sidebar />
        </div>
        <div className="col-sm-10">
          <div className="container">
            <div className='w-100 bg-dark'>
            <HomeSlider/>
            </div>
            <MedicineType />
          </div>
        </div>
      </div>
    </div>
  </>
}

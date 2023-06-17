import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MedicineStore } from '../../Context/MedicineContext.jsx';
import MedicineTypeDisplay from '../MedicineTypeDisplay/MedicineTypeDisplay.jsx';
import ReactPaginate from 'react-paginate';
import { sizeNum } from '../../Utils/axios.js';
import HomeSlider from '../HomeSlider/HomeSlider.jsx';

export default function MedicineType() {
  let { type } = useParams()
  let { data, getPage, handlePageClick, dataCount, page, setPage } = useContext(MedicineStore)
  useEffect(() => {
    getPage(1)
  }, [type])
  let pageWithFilter = Math.ceil(dataCount / sizeNum)
  return <>
    <div className="container">
      <div className="row">
      {/* <HomeSlider/> */}
        <MedicineTypeDisplay />
      </div>
    </div>

    <ReactPaginate
      previousLabel={'< previous'}
      nextLabel={'next >'}
      breakLabel={'...'}
      pageCount={pageWithFilter}
      pageRangeDisplayed={3}
      marginPagesDisplayed={2}
      onPageChange={handlePageClick}
      containerClassName={'pagination justify-content-center py-5'}
      pageClassName={'page-item'}
      pageLinkClassName={'page-link bg-ligth'}
      previousClassName={'page-item'}
      previousLinkClassName={'page-link bg-ligth'}
      nextClassName={'page-item'}
      nextLinkClassName={'page-link bg-ligth'}
      breakClassName={'page-item'}
      breakLinkClassName={'page-link bg-ligth'}
      activeClassName={'active'}
    />


  </>
}

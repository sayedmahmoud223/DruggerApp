import React from 'react'
import Slider from "react-slick";

export default function SidebarSlider() {
    var settings = {
        className: "",
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: false,
        

        // adaptiveHeight: true
    };
  return <>
      <div className='my-3 rounded-3'>
          <Slider  {...settings} >
              <img className='w-100' src={"https://res.cloudinary.com/dkgb7sf8k/image/upload/v1685162091/4972027b-99af-4ec1-9303-ac152a03e516_ozx5ei.jpg"} />
              <img className='w-100' src={"https://res.cloudinary.com/dkgb7sf8k/image/upload/v1685162029/deccaada-582b-4c6c-b5b2-8d49cd5f8b95_aanfd2.jpg"} />
              <img className='w-100' src={"https://res.cloudinary.com/dkgb7sf8k/image/upload/v1685162029/1c426ff3-7d4c-4a31-915a-a0bca9c4835c_trn3vp.jpg"} />
              <img className='w-100' src={"https://res.cloudinary.com/dkgb7sf8k/image/upload/v1685162028/a5dfc7b6-42d9-44c2-a0ea-b53cc320a575_afagt1.jpg"} />
          </Slider>
      </div>
  </>
}

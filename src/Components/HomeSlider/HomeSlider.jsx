import React from 'react'
import Slider from "react-slick";

export default function HomeSlider() {
    var settings = {
        className: "",
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        

        // adaptiveHeight: true
    };
  return <>
      <div className='my-3 rounded-3'>
          <Slider  {...settings} >
              <img className='w-100' height={350} src={"https://res.cloudinary.com/dg0pspgi1/image/upload/v1685019614/DruggerApp/Slider/1_kqqlyo.jpg"} />
              <img className='w-100' height={350} src={"https://res.cloudinary.com/dg0pspgi1/image/upload/v1685019611/DruggerApp/Slider/2_zyigky.jpg"} />
              <img className='w-100' height={350} src={"https://res.cloudinary.com/dg0pspgi1/image/upload/v1685019612/DruggerApp/Slider/3_ocfyum.jpg"} />
          </Slider>
      </div>
  </>
}

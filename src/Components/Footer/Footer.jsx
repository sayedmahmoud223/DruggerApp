import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return <>
<section className="mt-5">
  <footer className="text-center text-white" style={{backgroundColor: '#0a4275'}}>
    <div className="container p-4 pb-0">
      <section className>
        <p className="d-flex justify-content-center align-items-center my-3">
          <span className="me-3">Register for free</span>
         <Link to="/register"> <button type="button" className="btn btn-outline-light btn-rounded">
            Sign up!
          </button></Link>
        </p>
      </section>
    </div>
    <div className="text-center p-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
      © 2023 Copyright By Durgger App Team :
      <a className=" mx-3 text-white" href="#"> Drugger_App.com</a>
    </div>
  </footer>
</section>

  </>
}

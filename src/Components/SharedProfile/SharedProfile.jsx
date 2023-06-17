import React, { useContext, useEffect, useState } from "react";
import proStyle from "../SharedProfile/SharedProfile.modules.css";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link, useParams } from "react-router-dom";
import { defaultImage, logo1, logo2, mainLogo } from "../../Utils/logos.js";
import axios from "axios";
import { baseUrl } from "../../Utils/axios.js";
import { Grid } from "@mui/material";
// import Link from "@mui/material/Link";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
} from 'mdb-react-ui-kit';
import { profileStore } from "../../Context/ProfileContext.jsx";
import moment from "moment";




export default function SharedProfile() {
   
  let { profile1,profileMedicine,getUser1} = useContext(profileStore)
  let {id} = useParams()
  console.log({id});
  console.log({profileMedicine});
  useEffect(()=>{getUser1(id)},[id])


  return (
    <>
     <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
              <MDBBreadcrumbItem>
                <a href='#'>Home</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem>
                <a href="#">User</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src={profile1.profileURL ? profile1.profileURL : defaultImage}
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />
                <p className="text-muted mb-1 mt-3">{profile1.firstName + " " + profile1.lastName}</p>
                <p className="text-muted mb-4">{profile1.address}</p>
                <div className="d-flex justify-content-center mb-2">
                 
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="6">
                    <MDBCardText className="text-muted">{(profile1.firstName + " " + profile1.lastName)}</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="3">

                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="6">
                    <MDBCardText className="text-muted">{profile1.email}</MDBCardText>
                  </MDBCol>
              
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Pharmacy ID</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{profile1.pharId}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Pharmacy Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="6">
                    <MDBCardText className="text-muted">{profile1.pharName}</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="3">

                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Mobile</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="6">
                    <MDBCardText className="text-muted">{profile1.phone
                ? profile1.phone
                : "Please Add your phone number"}{" "}</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="3">

                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="6">
                    <MDBCardText className="text-muted">{profile1.address
                ? profile1.address
                : "Please add your address"}{" "}</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="3">
                 
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>


          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
    <div className="container rounded-4  py-3 my-5 px-3">
                           <h3 className="text-center">My medicines</h3>
                          <div className="row">
                          {profileMedicine?.map((item) => {
                                return <div className='col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 mt-5 product' key={item._id}>
                                  <div className='bg-white  rounded-4 shadow  my-3'>
                                    <Link to={`/medicinedetails/${item._id}`}>
                                      <div className='main-height mb-2'>
                                        <img className='w-100 h-100' src={item.medicineImage} alt="" />
                                      </div>
                                    </Link>
                                    <div className='p-2 redu'>
                                      <p><span className="fw-bolder">Name:</span>  {item.medicineName}</p>
                                      <p><span className="fw-bolder">Type:</span> {item.medicineType}</p>
                                      <p> <span className="fw-bolder">Price:</span> {item.medicineUnitPrice} EGP</p>
                                      <p> <span className="fw-bolder">Expire At:</span> {moment(item.medicineExpireDate).format("MM-DD-YYYY")}</p>
                                    </div>
                                  </div>
                                </div>

                              })}
                          </div>

      </div>

   

    </>
  );
}

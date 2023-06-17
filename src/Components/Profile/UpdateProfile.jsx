import React, { useEffect, useState } from "react";
import * as Yup from "yup";

import proStyle from "./Profile.module.css";
import { Link } from "react-router-dom";
import { avatar, defaultImage, logo1, logo2, mainLogo } from "../../Utils/logos.js";
import axios from "axios";
import { baseUrl } from "../../Utils/axios.js";
import { Grid, TextField } from "@mui/material";
import { useFormik } from "formik";

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
} from 'mdb-react-ui-kit';
import { toast } from "react-toastify";
import convertToBase64 from "../helper/helper.js";

export default function UpdateProfile() {
  const [profile, setProfile] = useState([]);

  const [file, setFile] = useState()


  const notify = (message, color) => toast[color](message);

  const [loading, setLoading] = useState(false);

  let validationSchema = Yup.object({
    email: Yup.string().email(),
    pharName: Yup.string()
    .min(3, "phar name should be at least 3 characters!")
    .max(20, "phar name should be less than 20 characters!")
    ,
  firstName: Yup.string()
    .min(3, "first  name should be at least 3 characters!")
    .max(20, "first name should be less than 20 characters!")
    ,
  lastName: Yup.string()
    .min(3, "last name should be at least 3 characters!")
    .max(20, "last name should be less than 20 characters!")
    ,
    phone:Yup.string(),
    address:Yup.string(),

  });
  
  let updateFormik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      pharName: "",
      phone: "",
      address: "",
    },
    validationSchema,

   
    onSubmit: async (values) => {
      let token = localStorage.getItem("token");
      await axios
        .post(`${baseUrl}/phar/updateUser`, values, {
          headers: { authorization: token },
        })
        .then((data) => {
          if (data.status == 200) {
            setLoading(false);
            notify("Success", "success");
          }
        })
        .catch((error) => {
          if (
            error.response.status == 400 ||
            error.response.status == 401 ||
            error.response.status == 409
          ) {
            setLoading(false);
            notify(error.response.data.message, "error");
          }
        });
    },
  });

  const onUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  }

  let avatarFormik = useFormik({
    initialValues: {
    
    },
  
    onSubmit: async (values) => {
      let token = localStorage.getItem("token");
      values = Object.assign(values, { profile : file || ''})
      await axios
        .patch(`${baseUrl}/phar/uploadProfilePic`, values, {
          headers: { authorization: token },
        })
        .then((data) => {
          if (data.status == 200) {
            setLoading(false);
            notify("Success", "success");
          }
        })
        .catch((error) => {
          if (
            error.response.status == 500 
          ) {
            setLoading(false);
            notify(error.response.data.message, "error");
          }
        });
    },
  });





  return (
    <>

<div className={proStyle.div}>
<form onSubmit={avatarFormik.handleSubmit} >
    <MDBContainer >
    <MDBCol  lg="12">
              <MDBCard style={{width:"400px"}} className="mb-4">
                <MDBCardBody className="text-center">
               
                                <div className='profile flex justify-center py-4'>
                  <label htmlFor="profile">
                    <img src={file || avatar} className={proStyle.profile_img} alt="avatar" />
                  </label>
                  
                  <input onChange={onUpload} type="file" id='profile' name='profile' />
              </div>
                
                  <div className="d-flex justify-content-center mb-2">
                  <button className="btn btn-primary" type='submit'>update avatar</button>

                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
    </MDBContainer>

    </form>

    
    <form onSubmit={updateFormik.handleSubmit}>
    <section >
        <MDBContainer>
          <MDBRow>
               <MDBCol lg="12">
              <MDBCard className="mb-4">
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Full Name</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="3">
                      <TextField
                        label="first name"
                        onBlur={updateFormik.handleBlur}
                        value={updateFormik.values.firstName}
                        onChange={updateFormik.handleChange}
                        type="text"
                        className={`form-control${
                          updateFormik.errors.firstName &&
                          updateFormik.touched.firstName
                            ? `${proStyle.error}`
                            : ""
                        }`}
                        id="firstName"
                        name="firstName"
                      />
                    </MDBCol>
                    <MDBCol sm="3">
                      <TextField
                        label="last name"
                        onBlur={updateFormik.handleBlur}
                        value={updateFormik.values.lastName}
                        onChange={updateFormik.handleChange}
                        type="text"
                        className={`form-control${
                          updateFormik.errors.lastName &&
                          updateFormik.touched.lastName
                            ? `${proStyle.error}`
                            : ""
                        }`}
                        id="lastName"
                        name="lastName"
                      />
                    </MDBCol>
                  </MDBRow>
                  <hr />

                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Pharmacy Name</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="6">
                      <TextField
                        label="Pharmacy Name"
                        onBlur={updateFormik.handleBlur}
                        value={updateFormik.values.pharName}
                        onChange={updateFormik.handleChange}
                        type="text"
                        className={`form-control${
                          updateFormik.errors.pharName &&
                          updateFormik.touched.pharName
                            ? `${proStyle.error}`
                            : ""
                        }`}
                        id="pharName"
                        name="pharName"
                      />
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Phone</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="6">
                      <TextField
                        label="Phone"
                        onBlur={updateFormik.handleBlur}
                        value={updateFormik.values.phone}
                        onChange={updateFormik.handleChange}
                        type="text"
                        className={`form-control${
                          updateFormik.errors.phone &&
                          updateFormik.touched.phone
                            ? `${proStyle.error}`
                            : ""
                        }`}
                        id="phone"
                        name="phone"
                      />
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Address</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="6">
                      <TextField
                        label="Address"
                        onBlur={updateFormik.handleBlur}
                        value={updateFormik.values.address}
                        onChange={updateFormik.handleChange}
                        type="text"
                        className={`form-control${
                          updateFormik.errors.address &&
                          updateFormik.touched.address
                            ? `${proStyle.error}`
                            : ""
                        }`}
                        id="address"
                        name="address"
                      />
                    </MDBCol>
                    

                  </MDBRow>
                  
                </MDBCardBody>
              </MDBCard>
              <Grid item xs={12}>
                <button
                  disabled={
                    !(
                      updateFormik.isValid &&
                      updateFormik.dirty &&
                      !loading
                    )
                  }
                  type="submit"
                  className="btn text-white w-100 bg-main"
                >
                  {!loading ? "Update" : <i className="fa-solid fa-spinner"></i>}
                </button>
              </Grid>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </form>
      
</div>
    </>
  );
}

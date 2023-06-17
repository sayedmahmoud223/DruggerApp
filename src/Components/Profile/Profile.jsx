import React, { useContext, useEffect, useState } from "react";
import proStyle from "./Profile.module.css";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import {
  avatar,
  defaultImage,
  logo1,
  logo2,
  mainLogo,
} from "../../Utils/logos.js";
import axios from "axios";
import { baseUrl } from "../../Utils/axios.js";
import { Grid } from "@mui/material";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
} from "mdb-react-ui-kit";
import { profileStore } from "../../Context/ProfileContext.jsx";
import moment from "moment";
import { toast1 } from "../../Utils/notify.js";



export default function Profile() {
  let { getUser, profile } = useContext(profileStore);
  const [userOrder, setUserOrder] = useState([])
  const [userMedicine, setUserMedicine] = useState([])
  const [oops, setoops] = useState(false)
 async function getUserOrders()
  {
    let token = localStorage.getItem("token");
    let data=await axios.get(`${baseUrl}/order/userOrder`,{headers:{authorization:token}})
    console.log({data});
    
    setUserOrder(data?.data?.orders)
  }
  async function deleteItems(id)
{
  setoops(true)
  let token = localStorage.getItem("token")
  let data =await  axios.patch(`${baseUrl}/medicine/${id}`,{},{headers:{authorization:token}})
  console.log({delete:data});
  toast1("Medicine is deleted","info")
}

  async function getUserMedicine()
  {
    setoops(false)
    let token = localStorage.getItem("token")
    let {data} = await axios.get(`${baseUrl}/medicine/usermedicine`,{headers:{authorization:token}})
    // console.log({usermed:data});
    setUserMedicine(data.Usermedicines)
  }
  console.log({userMedicine});
   console.log({userOrder});
  useEffect(() => {
    getUser();

    if(oops ==true)
    {
      getUserMedicine()
    }
    getUserOrders();
    getUserMedicine()
    
  }, [oops]);

  return (
    <>

      <section className="w-100" style={{ backgroundColor: "#eee" }}>
        <MDBContainer className="py-5 w-100">
          <MDBRow>
            <section className="h-100 gradient-custom-2">
              <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                  <div className="col col-lg-9 col-xl-7">
                    <div className="card w-100">
                      <div
                        className="rounded-top text-white d-flex flex-row"
                        style={{ backgroundColor: "#000", height: 200 }}
                      >
                        <div
                          className="ms-4 mt-5 d-flex flex-column"
                          style={{ width: 150 }}
                        >
                          <img
                            src={
                              profile.profileURL ? profile.profileURL : avatar
                            }
                            alt="Generic placeholder image"
                            className="img-fluid img-thumbnail mt-4 mb-2"
                            style={{ width: 150, zIndex: 1 }}
                            
                          />
                         <div className="d-flex justify-content-center mb-2">
                    <Link to={"/profile-update"}>
                      {" "}
                      <MDBBtn>update info</MDBBtn>
                    </Link>
                  </div>
                        </div>
                        <div className="ms-3" style={{ marginTop: 130 }}>
                          <p className="text-light mb-1">
                          {profile.firstName + " " + profile.lastName}
                          </p>
                          <p className="text-muted mb-4">{profile.address}</p>
                        </div>
                      </div>
                      <div
                        className="p-4 text-black"
                        style={{ backgroundColor: "#f8f9fa" }}
                      >
                        <div className="d-flex justify-content-end text-center py-1">
                          <div>
                            <p className="mb-1 h5 text-white">253</p>
                            <p className="small text-muted mb-0"></p>
                          </div>
                          <div className="px-3">
                            <p className="mb-1 h5 text-white">1026</p>
                            <p className="small text-muted mb-0 0 text-white"></p>
                          </div>
                          <div className="text-white">
                            <p className="mb-1 h5 text-white">478</p>
                            <p className="small text-muted mb- 0 text-white"></p>
                          </div>
                        </div>
                      </div>
                      <div className="card-body p-4 text-black">
                        <div className="mb-5 mt-5">
                          <p className="lead fw-normal mb-1 ">My profile</p>
                          <MDBCol lg="12">
                            <MDBCard className="mb-4">
                              <MDBCardBody>
                                <MDBRow>
                                  <MDBCol sm="3">
                                    <MDBCardText>Full Name</MDBCardText>
                                  </MDBCol>
                                  <MDBCol sm="6">
                                    <MDBCardText className="text-muted">
                                      {profile.firstName +
                                        " " +
                                        profile.lastName}
                                    </MDBCardText>
                                  </MDBCol>
                                  <MDBCol sm="3"></MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                  <MDBCol sm="3">
                                    <MDBCardText>Email</MDBCardText>
                                  </MDBCol>
                                  <MDBCol sm="6">
                                    <MDBCardText className="text-muted">
                                      {profile.email}
                                    </MDBCardText>
                                  </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                  <MDBCol sm="3">
                                    <MDBCardText>Pharmacy ID</MDBCardText>
                                  </MDBCol>
                                  <MDBCol sm="9">
                                    <MDBCardText className="text-muted">
                                      {profile.pharId}
                                    </MDBCardText>
                                  </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                  <MDBCol sm="3">
                                    <MDBCardText>Pharmacy Name</MDBCardText>
                                  </MDBCol>
                                  <MDBCol sm="6">
                                    <MDBCardText className="text-muted">
                                      {profile.pharName}
                                    </MDBCardText>
                                  </MDBCol>
                                  <MDBCol sm="3"></MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                  <MDBCol sm="3">
                                    <MDBCardText>Mobile</MDBCardText>
                                  </MDBCol>
                                  <MDBCol sm="6">
                                    <MDBCardText className="text-muted">
                                      {profile.phone
                                        ? profile.phone
                                        : "Please Add your phone number"}{" "}
                                    </MDBCardText>
                                  </MDBCol>
                                  <MDBCol sm="3"></MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                  <MDBCol sm="3">
                                    <MDBCardText>Address</MDBCardText>
                                  </MDBCol>
                                  <MDBCol sm="6">
                                    <MDBCardText className="text-muted">
                                      {profile.address
                                        ? profile.address
                                        : "Please add your address"}{" "}
                                    </MDBCardText>
                                  </MDBCol>
                                  <MDBCol sm="3"></MDBCol>
                                </MDBRow>
                              </MDBCardBody>
                            </MDBCard>
                          </MDBCol>
                        </div>
                        <div className="container my-3 rounded-4 shadow py-5">
                          <h6>My Ads</h6>
                          <div className="row">
                            {userMedicine?.map((item)=>{
                              return <div className="col-md-6 rounded-3 shadow my-3 py-2">
                                <img src={item.medicineImage} className="img-fluid" alt="" />
                                <p>Name: {item.medicineName.split(" ").slice( 0, 3)}</p>
                                <p>Type: {item.medicineType}</p>
                                <p className="ex-color">Expire At : {moment(item.medicineExpireDate).format("MM-DD-YYYY")}</p>

                                <p>Price:{item.medicineUnitPrice}</p>
                                <i onClick={()=>{ deleteItems(item._id)}} className="fa-solid fa-trash text-danger"></i>

                              </div>

                            })}
                          </div>
                        </div>
                        <div className="container  rounded-4 shadow py-3">
                                <div className="row">
                                  <h6 >My Orders</h6>
                                {userOrder?.map((ele)=>{
                                return <div className="col-md-6 rounded-3 shadow my-4 ">
                                    <p>orderId : {ele._id}</p>
                                    <p>Location : {ele.address}</p>
                                    <p>TotalPrice : {ele.totalFinalPrice} EGP</p>
                                    <p>order date :  {moment(ele.createdAt).format("MM-DD-YYYY  hh:mm a")} </p>

                                    {/* <div className="container my-3">
                                      <div className="row">
                                        <div className="col-md-3">
                                        <i className="fa-solid fa-hourglass-start text-success fs-2"></i>
                                        <p className="nm">Preparing</p>
                                        </div>
                                        <div className="col-md-1 border iii border-1"></div>
                                        <div className="col-md-3">
                                        <i className="fa-solid fa-truck-moving fs-2 text-muted"></i>
                                        <p className="nm">Shipping</p>
                                        </div>
                                        <div className="col-md-1 border iii border-1"></div>
                                        <div className="col-md-3">
                                        <i className="fa-solid fa-circle-check fs-2 text-muted"></i>
                                        <p className="nm">Delivered</p>
                                        </div>
                                      </div>
                                    </div> */}
                                  </div>
                                })}
                                </div>
                          </div>
                      
                    
                      

                     
                       
              
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </MDBRow>
        </MDBContainer>


      </section>

   
    </>
  );
}

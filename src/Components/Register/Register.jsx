import { useFormik } from "formik";
import React, { useState } from "react";
import regStyle from "./Register.module.css";
import * as Yup from "yup";
import axios from "axios";
import { baseUrl } from "../../Utils/axios.js";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Grid, TextField, Button } from "@mui/material";
import { logo1 } from "../../Utils/logos.js";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const notify = (message, color) => toast[color](message);
  const navigate = useNavigate();
  let validationSchema = Yup.object({
    pharId: Yup.string().length(10, "Phar id must be 10 numbers!").required(),
    pharName: Yup.string()
      .min(3, "phar name should be at least 3 characters!")
      .max(20, "phar name should be less than 20 characters!")
      .required("phar name is required"),
    firstName: Yup.string()
      .min(3, "first  name should be at least 3 characters!")
      .max(20, "first name should be less than 20 characters!")
      .required("first name is required"),
    lastName: Yup.string()
      .min(3, "last name should be at least 3 characters!")
      .max(20, "last name should be less than 20 characters!")
      .required("last name is required"),

    email: Yup.string().email().required("Email address is required"),

    password: Yup.string()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "password must be at least eight characters long, with at least one letter and one number"
      )
      .required("Password is required"),

    cPassword: Yup.string()
      .oneOf(
        [Yup.ref("password")],
        "password and confirmation password not match"
      )
      .required("Confirmation Password is required"),
  });

  let registerFormik = useFormik({
    initialValues: {
      pharId: "",
      pharName: "",
      email: "",
      password: "",
      cPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      await axios
        .post(`${baseUrl}/auth/register`, values)
        .then((data) => {
          if (data.status == 200) {
            setLoading(false);
            notify("Success", "success");
            console.log("heloooo");
            navigate("/login");
            console.log("heloooo");
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

  function AlertContainer({ firstInput, secondInput }) {
    const hasFirstInputError =
      registerFormik.errors[firstInput] && registerFormik.touched[firstInput];
    const hasSecondInputError =
      secondInput &&
      registerFormik.errors[secondInput] &&
      registerFormik.touched[secondInput];
    const isError =
      registerFormik.errors.password && registerFormik.touched.password;
    return (
      <div className="alert-container">
        {hasFirstInputError || hasSecondInputError ? (
          <div
            className="alert alert-danger"
            style={{
              color: "#d31225",
              border: "none",
              backgroundColor: "transparent",
            }}
          >
            {hasFirstInputError && (
              <>
                <i
                  className="fa-solid fa-circle-exclamation"
                  style={{ color: "#d31225" }}
                ></i>{" "}
                {registerFormik.errors[firstInput]}
                <br />
              </>
            )}
            {hasSecondInputError && (
              <>
                <i
                  className="fa-solid fa-circle-exclamation"
                  style={{ color: "#d31225" }}
                ></i>{" "}
                {registerFormik.errors[secondInput]}
                <br />
              </>
            )}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <div
          className={`${regStyle.form} row  m-auto my-5 bg-white rounded-4 p-4 shadow`}
        >
          ` <img src={logo1} alt="logo" className="w-25 m-auto mb-3" />
          <h2 className={`${regStyle.title}`}>
            Sign up for free to start using our services:
          </h2>
          <form onSubmit={registerFormik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Phar ID"
                  fullWidth
                  onBlur={registerFormik.handleBlur}
                  value={registerFormik.values.pharId}
                  onChange={registerFormik.handleChange}
                  type="text"
                  className={`form-control my-3 ${
                    registerFormik.errors.pharId &&
                    registerFormik.touched.pharId
                      ? `${regStyle.error}`
                      : ""
                  }`}
                  id="pharId"
                  name="pharId"
                />
                <div>
                  <AlertContainer firstInput="pharId" />
                </div>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Pharmacy name"
                  onBlur={registerFormik.handleBlur}
                  value={registerFormik.values.pharName}
                  onChange={registerFormik.handleChange}
                  type="text"
                  className={`form-control my-3 ${
                    registerFormik.errors.pharName &&
                    registerFormik.touched.pharName
                      ? `${regStyle.error}`
                      : ""
                  }`}
                  id="pharName"
                  name="pharName"
                  inputMode="numeric"
                />
                <div>
                  <AlertContainer firstInput="pharName" />
                </div>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="First name"
                  onBlur={registerFormik.handleBlur}
                  value={registerFormik.values.firstName}
                  onChange={registerFormik.handleChange}
                  type="text"
                  className={`form-control my-3 ${
                    registerFormik.errors.firstName &&
                    registerFormik.touched.firstName
                      ? `${regStyle.error}`
                      : ""
                  }`}
                  id="firstName"
                  name="firstName"
                />
                <div>
                  <AlertContainer firstInput="firstName" />
                </div>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Last name"
                  onBlur={registerFormik.handleBlur}
                  value={registerFormik.values.lastName}
                  onChange={registerFormik.handleChange}
                  type="text"
                  className={`form-control my-3 ${
                    registerFormik.errors.lastName &&
                    registerFormik.touched.lastName
                      ? `${regStyle.error}`
                      : ""
                  }`}
                  id="lastName"
                  name="lastName"
                />
                <div>
                  <AlertContainer firstInput="lastName" />
                </div>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Email"
                  onBlur={registerFormik.handleBlur}
                  value={registerFormik.values.email}
                  onChange={registerFormik.handleChange}
                  type="email"
                  className={`form-control my-3 ${
                    registerFormik.errors.email && registerFormik.touched.email
                      ? `${regStyle.error}`
                      : ""
                  }`}
                  id="email"
                  name="email"
                />
                <div>
                  <AlertContainer firstInput="email" />
                </div>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="Password"
                  onBlur={registerFormik.handleBlur}
                  value={registerFormik.values.password}
                  onChange={registerFormik.handleChange}
                  type="password"
                  className={`form-control my-3 ${
                    registerFormik.errors.password &&
                    registerFormik.touched.password
                      ? `${regStyle.error}`
                      : ""
                  }`}
                  id="password"
                  name="password"
                />

                <div>
                  <AlertContainer firstInput="password" />
                </div>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="Confirm Your Password"
                  onBlur={registerFormik.handleBlur}
                  value={registerFormik.values.cPassword}
                  onChange={registerFormik.handleChange}
                  type="password"
                  className={`form-control my-3 ${
                    registerFormik.errors.cPassword &&
                    registerFormik.touched.cPassword
                      ? `${regStyle.error}`
                      : ""
                  }`}
                  id="cPassword"
                  name="cPassword"
                />

                <div>
                  <AlertContainer firstInput="cPassword" />
                </div>
              </Grid>

              <Grid item xs={12}>
                <button
                  disabled={
                    !(
                      registerFormik.isValid &&
                      registerFormik.dirty &&
                      !loading
                    )
                  }
                  type="submit"
                  className="btn text-white w-100 bg-main"
                >
                  {!loading ? (
                    "Sign up"
                  ) : (
                    <i className="fa-solid fa-spinner"></i>
                  )}
                </button>
              </Grid>
              <Grid xs={12}>
                <p className={`${regStyle.forgot_password}`}>
                  Have an account?{" "}
                  <Link className={`${regStyle.link}`} to={"/login"}>
                    Log in
                  </Link>
                </p>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    </>
  );
}

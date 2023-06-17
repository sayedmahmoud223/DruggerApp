import { useFormik } from "formik";
import React, { useState } from "react";
import logStyle from "../User/User.module.css";
import * as Yup from "yup";
import axios from "axios";
import { baseUrl } from "../../Utils/axios.js";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Grid, TextField, Button } from "@mui/material";
import userStyle from './User.module.css'
import { logo1 } from "../../Utils/logos.js";

export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const notify = (message, color) => toast[color](message);
  let navigate = useNavigate();
  let validationSchema = Yup.object({
    email: Yup.string().email().required("Email address is required"),
    password: Yup.string()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "password must be at least eight characters long, with at least one letter and one number"
      )
      .required("Password is required"),
  });

  let registerFormik = useFormik({
    initialValues: {
      otp:"",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      axios
        .post(`${baseUrl}/auth/resetPasswordOTP`, values)
        .then((data) => {
          //console.log(data);
          if (data.status == 200) {
            setLoading(false);
            notify("Success", "success");
            navigate("/login");
          }
        })
        .catch((error) => {
          if (
            error.response.status == 400 ||
            error.response.status == 410 ||
            error.response.status == 404
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
          className={`${logStyle.form} row  m-auto my-5 bg-white rounded-4 p-4 shadow`}
        >
<img src={logo1} alt="logo" className="w-50 m-auto mb-3" />

          <h2 className={`${userStyle.title}`}>Reset password:</h2>

          <form onSubmit={registerFormik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="OTP Code"
                  fullWidth
                  onBlur={registerFormik.handleBlur}
                  value={registerFormik.values.pharId}
                  onChange={registerFormik.handleChange}
                  type="text"
                  className={`form-control my-3 ${
                    registerFormik.errors.pharId &&
                    registerFormik.touched.pharId
                      ? `${logStyle.error}`
                      : ""
                  }`}
                  id="otp"
                  name="otp"
                />
                <div>
                  <AlertContainer firstInput="pharId" />
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
                      ? `${logStyle.error}`
                      : ""
                  }`}
                  id="email"
                  name="email"
                />
                <div>
                  <AlertContainer firstInput="email" />
                </div>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Password"
                  onBlur={registerFormik.handleBlur}
                  value={registerFormik.values.password}
                  onChange={registerFormik.handleChange}
                  type="password"
                  className={`form-control my-3 ${
                    registerFormik.errors.password &&
                    registerFormik.touched.password
                      ? `${logStyle.error}`
                      : ""
                  }`}
                  id="password"
                  name="password"
                />

                <div>
                  <AlertContainer firstInput="password" />
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
                  {!loading ? "Register" : <i class="fa-solid fa-spinner"></i>}
                </button>
              </Grid>

              <Grid item xs={12}>
                <p className={`${logStyle.forgot_password}`}>
                  <Link className={`${logStyle.link}`} to={"/forgot-password"}>
                    Forgot Your password ..?
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

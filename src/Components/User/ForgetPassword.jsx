import { useFormik } from "formik";
import React, { useState } from "react";
import userStyle from "./User.module.css";
import * as Yup from "yup";
import axios from "axios";
import { baseUrl } from "../../Utils/axios.js";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Grid, TextField, Button } from "@mui/material";
import { logo1 } from "../../Utils/logos.js";

export default function ForgetPassword() {
  const [loading, setLoading] = useState(false);
  const notify = (message, color) => toast[color](message);
  let navigate = useNavigate();
  let validationSchema = Yup.object({
    email: Yup.string().email().required("Email address is required"),

  });

  let registerFormik = useFormik({
    initialValues: {

      email: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      axios
        .post(`${baseUrl}/auth/forgetPasswordOTP`, values)
        .then((data) => {
          //console.log(data);
          if (data.status == 200) {
            setLoading(false);
            notify("We've sent you an email. Just copy OTP code to reset your password.", "success");
            navigate("/reset-password");
          }
        })
        .catch((error) => {
          if (
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
          className={`${userStyle.form} row  m-auto my-5 bg-white rounded-4 p-4 shadow`}
        >
          <img src={logo1} alt="logo" className="w-50 m-auto mb-3" />
          <h2 className={`${userStyle.title}`}>Forgot password:</h2>

          <form onSubmit={registerFormik.handleSubmit}>
            <Grid container spacing={2}>
              <p className={`${userStyle.para} p-3 mt-3`}>
                Enter your email address that you used to register. We'll send
                you an email with OTP code to reset your password.
              </p>
              <Grid item xs={12}>
                <TextField
                  label="Enter your email"
                  onBlur={registerFormik.handleBlur}
                  value={registerFormik.values.email}
                  onChange={registerFormik.handleChange}
                  type="email"
                  className={`form-control my-3 ${
                    registerFormik.errors.email && registerFormik.touched.email
                      ? `${userStyle.error}`
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
                    "Send reset code..?"
                  ) : (
                    <i class="fa-solid fa-spinner"></i>
                  )}
                </button>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    </>
  );
}

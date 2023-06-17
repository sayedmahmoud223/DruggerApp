import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import dayjs from 'dayjs';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react'
import {
  LocalizationProvider, DatePicker
} from "@mui/x-date-pickers"
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { baseUrl } from '../../Utils/axios.js';
import axios from 'axios';
import { toast } from 'react-toastify';
import { toast1 } from '../../Utils/notify.js';

export default function AddMedicine() {
  const [isLoading, setIsLoading] = useState(false)
  const notify = (message, color) => toast[color](message);
  let medicineType = [
    { name: "Capsules", icon: "fa-solid fa-capsules" },
    { name: "Injections", icon: "fa-solid fa-syringe" },
    { name: "Syrups", icon: "fa-solid fa-wine-bottle" },
    { name: "Inhalers", icon: "fa-solid fa-wine-bottle" },
    { name: "Drops", icon: "fa-solid fa-droplet" },
    { name: "Sprays", icon: "fa-solid fa-spray-can" },
    { name: "Solutions", icon: "fa-solid fa-bottle-droplet" },
    { name: "Topical preparations", icon: "fa-solid fa-capsules" },
    { name: "Powders", icon: "fa-solid fa-capsules" },
  ]
  
  return <>
    <Formik
      initialValues={{
        medicineImage: '',
        medicineStock: '',
        medicineDesc: '',
        medicineUnitPrice: '',
        medicineType: '',
        medicineName: '',
        // medicineExpireDate: '',
      }}
      onSubmit={async(values) => { console.log(values);
        const formData = new FormData();
        formData.append('medicineImage', values.medicineImage);
        formData.append('medicineStock', values.medicineStock);
        formData.append('medicineDesc', values.medicineDesc);
        formData.append('medicineUnitPrice', values.medicineUnitPrice);
        formData.append('medicineType', values.medicineType);
        formData.append('medicineName', values.medicineName);
        formData.append('medicineExpireDate', values.medicineExpireDate);
        //console.log(formData);
        let token = localStorage.getItem("token")
        if (token) {
         await axios.post(`${baseUrl}/medicine`,  formData , { headers: { authorization: token }}).then((res)=>{
           if (res.data.message == "success" && res.status == 201) {
             console.log("hello");
             setIsLoading(false)
             toast1("Medicine added", "info");
           }}).catch((err)=>{
            if(err){
              setIsLoading(false)
              console.log(err.response.data.Error);
              notify(`${err.response.data.Error}`,"error")
            }
           })
        }

      }}
    >
      {({ setFieldValue, errors, touched, dirty,handleBlur,isValid }) => (<div className="container">
        <div className="w-75 m-auto">
          <h2 className='text-main my-4'>Add Medicine</h2>
          <Grid spacing={2}>
            <Form>
              <Grid item xs={12}>
                <Field name="medicineName" error={touched.medicineName && !!errors.medicineName}
                  helperText={touched.medicineName && errors.medicineName} as={TextField} className="w-100 my-2" id="outlined-basic" label="Name" variant="outlined" />
              </Grid>


              <Grid item xs={12}>
                <Field name="medicineStock" error={touched.medicineStock && !!errors.medicineStock}
                  helperText={touched.medicineStock && errors.medicineStock} as={TextField} className="w-100 my-2" id="outlined-basic" label="stock" variant="outlined" />
              </Grid>


              <Grid item xs={12}>
                <Field name="medicineDesc" error={touched.medicineDesc && !!errors.medicineDesc}
                  helperText={touched.medicineDesc && errors.medicineDesc} as={TextField} className="w-100 my-2" id="outlined-basic" label="Description" variant="outlined" />
              </Grid>


              <Grid item xs={12}>
                <Field name="medicineUnitPrice" error={touched.medicineUnitPrice && !!errors.medicineUnitPrice}
                  helperText={touched.medicineUnitPrice && errors.medicineUnitPrice} as={TextField} className="w-100 my-2" id="outlined-basic" label="Price" variant="outlined" />
              </Grid>

              <Grid item xs={12}>
                <Field name="medicineExpireDate">
                  {({ field, form }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Expire Date"
                        error={touched.medicineExpireDate && !!errors.medicineExpireDate}
                        helperText={touched.medicineExpireDate && errors.medicineExpireDate}
                        className='w-100 my-2'
                        name={"medicineExpireDate"}
                        format="MM-DD-YYYY"
                        value={dayjs('17-03-2024')}
                        onChange={(date) => form.setFieldValue("medicineExpireDate", date.format("MM-DD-YYYY"))}
                        renderInput={(params) => (
                          <TextField {...params} className='w-100' label="Expire Date" variant="outlined" />
                          )}
                          />
                    </LocalizationProvider>
                  )}
                </Field>
              </Grid>

              <Grid item xs={12}>
                <Field name="medicineType" error={touched.medicineType && !!errors.medicineType}
                  helperText={touched.medicineType && errors.medicineType}>
                  {({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-filled-label">Medicine Type</InputLabel>
                      <Select
                        {...field}
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        label="Medicine Type"
                        className='my-2'
                        >
                        {medicineType.map((ele) => (
                          <MenuItem key={ele.name} value={ele.name}>
                            {ele.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                </Field>
              </Grid>


              <Field name="medicineImage">
                {({ field, form }) => (
                  <div className="file-input">
                    <label htmlFor="pic" className="form-label">Select an image</label>
                    <input
                      className="form-control w-100"
                      id="pic"
                      type="file"
                      onChange={(event) => {
                        const file = event.target.files[0];
                        form.setFieldValue(field.name, file);
                      }}
                      />
                  </div>
                )}
              </Field>
                      {console.log(isValid)}
              <button  disabled={!(isValid&&dirty)} className='btn d-block w-100 my-3 bg-main text-white' type="submit">{!isLoading ? "Add Medicine": <i className='fa-solid fa-spinner fa-spin'></i>}</button>
            </Form>
            
          </Grid>
          



        </div>
      </div>
      )}
    </Formik>

  </>
}



// import { Grid, MenuItem, Select, TextField } from '@mui/material';
// import { Form, Field, Formik } from 'formik';
// import React from 'react'
// // import { Form } from 'react-router-dom';

// export default function AddMedicine() {
//   let medicineType = [
//     { name: "Capsules", icon: "fa-solid fa-capsules" },
//     { name: "Injections", icon: "fa-solid fa-syringe" },
//     { name: "Syrups", icon: "fa-solid fa-wine-bottle" },
//     { name: "Inhalers", icon: "fa-solid fa-wine-bottle" },
//     { name: "Drops", icon: "fa-solid fa-droplet" },
//     { name: "Sprays", icon: "fa-solid fa-spray-can" },
//     { name: "Solutions", icon: "fa-solid fa-bottle-droplet" },
//     { name: "Topical preparations", icon: "fa-solid fa-capsules" },
//     { name: "Powders", icon: "fa-solid fa-capsules" },
//   ]
//   const handleSubmit = async (values, { setSubmitting }) => {
//     try {
//       // Prevent page reload
//       setSubmitting(true);

//       // Handle form submission
//       //console.log(values);
//       const formData = new FormData();
//       formData.append('medicineImage', values.medicineImage);
//       formData.append('medicineStock', values.medicineStock);
//       formData.append('medicineDesc', values.medicineDesc);
//       formData.append('medicineUnitPrice', values.medicineUnitPrice);
//       formData.append('medicineType', values.medicineType);
//       formData.append('medicineName', values.medicineName);

//       //console.log(formData);
//       // Make an API request with the form data
//       // await axios.post('/api/upload', formData);

//       // Reset form values
//       // You can reset form values if needed

//       // Handle successful submission
//       // You can show a success message or redirect the user

//     } catch (error) {
//       // Handle errors
//       console.error(error);
//     } finally {
//       setSubmitting(false);
//     }
//   };



//   return <>
//     <Formik
//       initialValues={{
//         medicineImage: null,
//         medicineStock: '',
//         medicineDesc: '',
//         medicineUnitPrice: '',
//         medicineType: '',
//         medicineName: '',
//       }}
//       onSubmit={(values) => {
//         //console.log(values);
//       }}
//     >
//       {({ values, setFieldValue, isSubmitting }) => (
//         <Form>
//           <Field name="medicineImage">
//             {({ field }) => (
//               <div>
//                 <input
//                   type="file"
//                   onChange={(event) => {
//                     const file = event.target.files[0];
//                     setFieldValue('medicineImage', file);
//                   }}
//                 />
//               </div>
//             )}
//           </Field>

//           {/* <label htmlFor="medicineStock">Stock</label>
//           <input type="text" id="medicineStock" name="medicineStock" /> */}


          
//           {/* <label htmlFor="medicineUnitPrice">Unit Price</label>
//           <input type="text" id="medicineUnitPrice" name="medicineUnitPrice" /> */}

//           

//           <Grid item xs={12}>
//             <Field name="medicineName" as={TextField} className="w-100" id="outlined-basic" label="Price" variant="filled" />
//           </Grid>

//           <button type="submit" disabled={isSubmitting}>
//             {isSubmitting ? 'Submitting...' : 'Submit'}
//           </button>
//         </Form>
//       )}
//     </Formik>


//   </>
// }

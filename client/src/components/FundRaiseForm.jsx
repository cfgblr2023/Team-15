import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../components/auth/validate.css";

const RaiseFundForm = () => {
  const [showForm, setShowForm] = useState(false);

  const formik = useFormik({
    initialValues: {
      orgName: "",
      Amount: "",
      contact: "",
      email: "",
    },
    validationSchema: Yup.object({
      orgName: Yup.string().required("Organization name must be entered"),
      Amount: Yup.number().required("Amount must be entered"),
      contact: Yup.string().required("Contact must be entered"),
      email: Yup.string().email("Invalid email").required("Email is required"),
    }),
    onSubmit: (values) => {
      axios
        .post("http://localhost:3000/api/fundraiser/", values)
        .then((response) => {
          console.log("POST request successful:", response.data);
          // Handle the response as needed
          toast.success("Form submitted successfully");
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
          // Handle the error as needed
          toast.error("Failed to submit form");
        });
    },
  });

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <>
      <div className="signup-page-area pd-top-120 pd-bottom-120">
        <div className="container">
          <button onClick={toggleForm}>Add</button>
          {showForm && (
            <div className="row justify-content-center">
              <div className="col-xl-6 col-lg-7">
                <form className="signin-inner" onSubmit={formik.handleSubmit}>
                  <div className="row">
                    <div className="col-12">
                      <div className="single-input-inner">
                        <label htmlFor="orgName">Organization Name</label>
                        <input
                          type="text"
                          placeholder="Organization Name"
                          name="orgName"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.orgName}
                        />
                      </div>
                      {formik.errors.orgName && formik.touched.orgName && (
                        <div className="error-message">
                          {formik.errors.orgName}
                        </div>
                      )}
                    </div>
                    <div className="col-12">
                      <div className="single-input-inner">
                        <label htmlFor="Amount">Amount</label>
                        <input
                          type="number"
                          placeholder="Amount"
                          name="Amount"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.Amount}
                        />
                      </div>
                      {formik.errors.Amount && formik.touched.Amount && (
                        <div className="error-message">
                          {formik.errors.Amount}
                        </div>
                      )}
                    </div>
                    <div className="col-12">
                      <div className="single-input-inner">
                        <label htmlFor="contact">Contact</label>
                        <input
                          type="text"
                          placeholder="Contact"
                          name="contact"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.contact}
                        />
                      </div>
                      {formik.errors.contact && formik.touched.contact && (
                        <div className="error-message">
                          {formik.errors.contact}
                        </div>
                      )}
                    </div>
                    <div className="col-12">
                      <div className="single-input-inner">
                        <label htmlFor="email">Email</label>
                        <input
                          type="text"
                          placeholder="Email"
                          name="email"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.email}
                        />
                      </div>
                      {formik.errors.email && formik.touched.email && (
                        <div className="error-message">
                          {formik.errors.email}
                        </div>
                      )}
                    </div>
                    <div className="col-12 mb-4">
                      <button className="btn btn-base w-100" type="submit">
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
        <ToastContainer />
      </div>
      
    </>
  );
};

export default RaiseFundForm;

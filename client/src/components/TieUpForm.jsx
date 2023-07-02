import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../components/auth/validate.css";

const TieUpForm = () => {
  const [showForm, setShowForm] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      poi: "",
      email: "",
      location: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name must be entered"),
      poi: Yup.string().required("Point of Contact must be entered"),
      email: Yup.string().required("Email must be entered"),
      location: Yup.string().required("Location is required"),
    }),
    onSubmit: (values) => {
      axios
        .post("http://localhost:3000/api/schools/", values)
        .then((response) => {
          console.log("POST request successful:", response.data);
          toast.success("Form submitted successfully");
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
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
                        <label htmlFor="name">name</label>
                        <input
                          type="text"
                          placeholder="name"
                          name="name"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.name}
                        />
                      </div>
                      {formik.errors.name && formik.touched.name && (
                        <div className="error-message">
                          {formik.errors.name}
                        </div>
                      )}
                    </div>
                    <div className="col-12">
                      <div className="single-input-inner">
                        <label htmlFor="poi">Point of Contact</label>
                        <input
                          type="text"
                          placeholder="Point of Contact"
                          name="poi"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.poi}
                        />
                      </div>
                      {formik.errors.poi && formik.touched.poi && (
                        <div className="error-message">
                          {formik.errors.poi}
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
                    <div className="col-12">
                      <div className="single-input-inner">
                        <label htmlFor="location">Location</label>
                        <input
                          type="text"
                          placeholder="Location"
                          name="location"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.location}
                        />
                      </div>
                      {formik.errors.location && formik.touched.locations && (
                        <div className="error-message">
                          {formik.errors.location}
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

export default TieUpForm;

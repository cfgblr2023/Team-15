import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../components/auth/validate.css";

const EventOrganiser = () => {
  const [showForm, setShowForm] = useState(false);

  const formik = useFormik({
    initialValues: {
      EventName: "",
      Date: "",
      Desc: "",
      location: "",
    },
    validationSchema: Yup.object({
      EventName: Yup.string().required("Organization name must be entered"),
      Date: Yup.date().required("Date must be entered"),
      Desc: Yup.string().required("Descrip must be entered"),
      location: Yup.string().required("location is required"),
    }),
    onSubmit: (values) => {
      values.Date=values.Date.toString();
      axios
        .post("http://localhost:3000/api/events", values)
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
                        <label htmlFor="EventName">Organization Name</label>
                        <input
                          type="text"
                          placeholder="Organization Name"
                          name="EventName"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.EventName}
                        />
                      </div>
                      {formik.errors.EventName && formik.touched.EventName && (
                        <div className="error-message">
                          {formik.errors.EventName}
                        </div>
                      )}
                    </div>
                    <div className="col-12">
                      <div className="single-input-inner">
                        <label htmlFor="Date">Date</label>
                        <input
                          type="Date"
                          placeholder="Date"
                          name="Date"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.Date}
                        />
                      </div>
                      {formik.errors.Date && formik.touched.Date && (
                        <div className="error-message">
                          {formik.errors.Date}
                        </div>
                      )}
                    </div>
                    <div className="col-12">
                      <div className="single-input-inner">
                        <label htmlFor="Description">Desc</label>
                        <input
                          type="text"
                          placeholder="Description"
                          name="Desc"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.Desc}
                        />
                      </div>
                      {formik.errors.Desc && formik.touched.Desc && (
                        <div className="error-message">
                          {formik.errors.Desc}
                        </div>
                      )}
                    </div>
                    <div className="col-12">
                      <div className="single-input-inner">
                        <label htmlFor="location">location</label>
                        <input
                          type="text"
                          placeholder="location"
                          name="location"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.location}
                        />
                      </div>
                      {formik.errors.location && formik.touched.location && (
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

export default EventOrganiser;

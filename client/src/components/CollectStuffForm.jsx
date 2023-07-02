import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../components/auth/validate.css";

const CollectStuff = () => {
  const [showForm, setShowForm] = useState(false);

  const formik = useFormik({
    initialValues: {
      item: "",
      quantity: "",
      name: "",
      email: "",
    },
    validationSchema: Yup.object({
      item: Yup.string().required("Item name must be entered"),
      quantity: Yup.number().required("Quantity must be entered"),
      name: Yup.string().required("Name must be entered"),
      email: Yup.string().email("Invalid email").required("Email is required"),
    }),
    onSubmit: (values) => {
      axios
        .post("http://localhost:3000/api/monetory/", values)
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
                        <label htmlFor="item">Item</label>
                        <input
                          type="text"
                          placeholder="Item"
                          name="item"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.item}
                        />
                      </div>
                      {formik.errors.item && formik.touched.item && (
                        <div className="error-message">
                          {formik.errors.item}
                        </div>
                      )}
                    </div>
                    <div className="col-12">
                      <div className="single-input-inner">
                        <label htmlFor="quantity">Quantity</label>
                        <input
                          type="number"
                          placeholder="Quantity"
                          name="quantity"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.quantity}
                        />
                      </div>
                      {formik.errors.quantity && formik.touched.quantity && (
                        <div className="error-message">
                          {formik.errors.quantity}
                        </div>
                      )}
                    </div>
                    <div className="col-12">
                      <div className="single-input-inner">
                        <label htmlFor="name">Name</label>
                        <input
                          type="text"
                          placeholder="Name"
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

export default CollectStuff;

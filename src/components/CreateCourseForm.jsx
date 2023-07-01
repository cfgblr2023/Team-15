import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../components/auth/validate.css";
import { Navigate, useNavigate } from "react-router-dom";

const CreateCourseFund = () => {
    const navigate=useNavigate();
  const formik = useFormik({
    initialValues: {
      title: "",
      desc: "",
      img: "",
      price: "",
      rating: "",
      category: "",
      duration: "",
      lectures: "",
      tags: "",
      instructor: "",
      free: false,
      video: "",
      address: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      desc: Yup.string().required("Description is required"),
      img: Yup.string()
        .required("Image link is required"),
      price: Yup.number().required("Price is required"),
      rating: Yup.number().required("Rating is required"),
      category: Yup.string().required("Category is required"),
      duration: Yup.string().required("Duration is required"),
      lectures: Yup.number().required("Number of lectures is required"),
      tags: Yup.string().required("Tags are required"),
      instructor: Yup.string().required("Instructor name is required"),
      free: Yup.boolean(),
      video: Yup.string()
        .required("Video link is required"),
      address: Yup.string().required("Address is required"),
    }),
    onSubmit: (values) => {
      axios
        .post("http://localhost:3000/api/courses/", values)
        .then((response) => {
          console.log("POST request successful:", response.data);
          // Handle the response as needed
          toast.success("Form submitted successfully");
          navigate("../");
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
          // Handle the error as needed
          toast.error("Failed to submit form");
        });
    },
  });
  return (
    <>
      <div className="signup-page-area pd-top-120 pd-bottom-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-7">
              <form className="signin-inner" onSubmit={formik.handleSubmit}>
                <div className="row">
                  <div className="col-12">
                    <div
                      className={`single-input-inner ${
                        formik.errors.title && formik.touched.title
                          ? "is-invalid"
                          : ""
                      }`}
                    >
                      <input
                        type="text"
                        placeholder="Title"
                        name="title"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.title}
                      />
                    </div>
                    {formik.errors.title && formik.touched.title && (
                      <div className="error-message">{formik.errors.title}</div>
                    )}
                  </div>
                  <div className="col-12">
                    <div
                      className={`single-input-inner ${
                        formik.errors.desc && formik.touched.desc
                          ? "is-invalid"
                          : ""
                      }`}
                    >
                      <textarea
                        placeholder="Description"
                        name="desc"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.desc}
                      ></textarea>
                    </div>
                    {formik.errors.desc &&
                      formik.touched.desc && (
                        <div className="error-message">
                          {formik.errors.desc}
                        </div>
                      )}
                  </div>
                  <div className="col-12">
                    <div
                      className={`single-input-inner ${
                        formik.errors.img && formik.touched.img
                          ? "is-invalid"
                          : ""
                      }`}
                    >
                      <input
                        type="text"
                        placeholder="Image Link"
                        name="img"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.img}
                      />
                    </div>
                    {formik.errors.img && formik.touched.img && (
                      <div className="error-message">
                        {formik.errors.img}
                      </div>
                    )}
                  </div>
                  <div className="col-12">
                    <div
                      className={`single-input-inner ${
                        formik.errors.price && formik.touched.price
                          ? "is-invalid"
                          : ""
                      }`}
                    >
                      <input
                        type="number"
                        placeholder="Price"
                        name="price"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.price}
                      />
                    </div>
                    {formik.errors.price && formik.touched.price && (
                      <div className="error-message">{formik.errors.price}</div>
                    )}
                  </div>
                  <div className="col-12">
                    <div
                      className={`single-input-inner ${
                        formik.errors.rating && formik.touched.rating
                          ? "is-invalid"
                          : ""
                      }`}
                    >
                      <input
                        type="number"
                        placeholder="Rating"
                        name="rating"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.rating}
                      />
                    </div>
                    {formik.errors.rating && formik.touched.rating && (
                      <div className="error-message">
                        {formik.errors.rating}
                      </div>
                    )}
                  </div>
                  <div className="col-12">
                    <div
                      className={`single-input-inner ${
                        formik.errors.category && formik.touched.category
                          ? "is-invalid"
                          : ""
                      }`}
                    >
                      <input
                        type="text"
                        placeholder="Category"
                        name="category"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.category}
                      />
                    </div>
                    {formik.errors.category && formik.touched.category && (
                      <div className="error-message">
                        {formik.errors.category}
                      </div>
                    )}
                  </div>
                  <div className="col-12">
                    <div
                      className={`single-input-inner ${
                        formik.errors.duration && formik.touched.duration
                          ? "is-invalid"
                          : ""
                      }`}
                    >
                      <input
                        type="text"
                        placeholder="Duration"
                        name="duration"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.duration}
                      />
                    </div>
                    {formik.errors.duration && formik.touched.duration && (
                      <div className="error-message">
                        {formik.errors.duration}
                      </div>
                    )}
                  </div>
                  <div className="col-12">
                    <div
                      className={`single-input-inner ${
                        formik.errors.lectures && formik.touched.lectures
                          ? "is-invalid"
                          : ""
                      }`}
                    >
                      <input
                        type="text"
                        placeholder="Number of Lectures"
                        name="lectures"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.lectures}
                      />
                    </div>
                    {formik.errors.lectures && formik.touched.lectures && (
                      <div className="error-message">
                        {formik.errors.lectures}
                      </div>
                    )}
                  </div>
                  <div className="col-12">
                    <div
                      className={`single-input-inner ${
                        formik.errors.tags && formik.touched.tags
                          ? "is-invalid"
                          : ""
                      }`}
                    >
                      <input
                        type="text"
                        placeholder="Tags"
                        name="tags"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.tags}
                      />
                    </div>
                    {formik.errors.tags && formik.touched.tags && (
                      <div className="error-message">{formik.errors.tags}</div>
                    )}
                  </div>
                  <div className="col-12">
                    <div
                      className={`single-input-inner ${
                        formik.errors.instructor && formik.touched.instructor
                          ? "is-invalid"
                          : ""
                      }`}
                    >
                      <input
                        type="text"
                        placeholder="Instructor"
                        name="instructor"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.instructor}
                      />
                    </div>
                    {formik.errors.instructor && formik.touched.instructor && (
                      <div className="error-message">
                        {formik.errors.instructor}
                      </div>
                    )}
                  </div>
                  <div className="col-12">
                    <div className="single-input-inner">
                      <label>
                        <input
                          type="checkbox"
                          name="free"
                          checked={formik.values.free}
                          onChange={formik.handleChange}
                        />
                        Free
                      </label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div
                      className={`single-input-inner ${
                        formik.errors.video && formik.touched.video
                          ? "is-invalid"
                          : ""
                      }`}
                    >
                      <input
                        type="text"
                        placeholder="Video Link"
                        name="video"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.video}
                      />
                    </div>
                    {formik.errors.video && formik.touched.video && (
                      <div className="error-message">
                        {formik.errors.video}
                      </div>
                    )}
                  </div>
                  <div className="col-12">
                    <div
                      className={`single-input-inner ${
                        formik.errors.address && formik.touched.address
                          ? "is-invalid"
                          : ""
                      }`}
                    >
                      <input
                        type="text"
                        placeholder="Address"
                        name="address"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.address}
                      />
                    </div>
                    {formik.errors.address && formik.touched.address && (
                      <div className="error-message">
                        {formik.errors.address}
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
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default CreateCourseFund;

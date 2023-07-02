import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../components/auth/validate.css";
import { Navigate, useNavigate } from "react-router-dom";

const CreateCourseFund = () => {
  const navigate = useNavigate();
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
      img: Yup.string().required("Image link is required"),
      price: Yup.number().required("Price is required"),
      rating: Yup.number().required("Rating is required"),
      category: Yup.string().required("Category is required"),
      duration: Yup.string().required("Duration is required"),
      lectures: Yup.number().required("Number of lectures is required"),
      tags: Yup.string().required("Tags are required"),
      instructor: Yup.string().required("Instructor name is required"),
      free: Yup.boolean(),
      video: Yup.string().required("Video link is required"),
      address: Yup.string().required("Address is required"),
    }),
    onSubmit: (values) => {
      axios
        .post("http://localhost:3000/api/courses/", values)
        .then((response) => {
          console.log("POST request successful:", response.data);
          // Handle the response as needed
          window.location.replace('https://demo.bigbluebutton.org/')
          toast.success("Form submitted successfully");
        })
        // .catch((error) => {
        //   console.error("Error submitting form:", error);
        //   // Handle the error as needed
        //   toast.error("Failed to submit form");
        // });
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
                    <div className="single-input-inner">
                      <label htmlFor="title">Title</label>
                      <input
                        type="text"
                        id="title"
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
                    <div className="single-input-inner">
                      <label htmlFor="desc">Description</label>
                      <textarea
                        id="desc"
                        placeholder="Description"
                        name="desc"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.desc}
                      ></textarea>
                    </div>
                    {formik.errors.desc && formik.touched.desc && (
                      <div className="error-message">
                        {formik.errors.desc}
                      </div>
                    )}
                  </div>
                  <div className="col-12">
                    <div className="single-input-inner">
                      <label htmlFor="img">Image Link</label>
                      <input
                        type="text"
                        id="img"
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
                    <div className="single-input-inner">
                      <label htmlFor="price">Price</label>
                      <input
                        type="number"
                        id="price"
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
                    <div className="single-input-inner">
                      <label htmlFor="rating">Rating</label>
                      <input
                        type="number"
                        id="rating"
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
                    <div className="single-input-inner">
                      <label htmlFor="category">Category</label>
                      <input
                        type="text"
                        id="category"
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
                    <div className="single-input-inner">
                      <label htmlFor="duration">Duration</label>
                      <input
                        type="text"
                        id="duration"
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
                    <div className="single-input-inner">
                      <label htmlFor="lectures">Number of Lectures</label>
                      <input
                        type="text"
                        id="lectures"
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
                    <div className="single-input-inner">
                      <label htmlFor="tags">Tags</label>
                      <input
                        type="text"
                        id="tags"
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
                    <div className="single-input-inner">
                      <label htmlFor="instructor">Instructor</label>
                      <input
                        type="text"
                        id="instructor"
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
                      <label htmlFor="free">
                        <input
                          type="checkbox"
                          id="free"
                          name="free"
                          checked={formik.values.free}
                          onChange={formik.handleChange}
                        />
                        Free
                      </label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="single-input-inner">
                      <label htmlFor="video">Video Link</label>
                      <input
                        type="text"
                        id="video"
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
                    <div className="single-input-inner">
                      <label htmlFor="address">Address</label>
                      <input
                        type="text"
                        id="address"
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

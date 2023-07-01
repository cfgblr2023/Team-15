import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./validate.css";

export default function Signup() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      skills: "",
      role: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username must be entered"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      skills: Yup.string().required("Skills is required"),
      password: Yup.string()
        .matches(
          /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/,
          "Password should be 7-15 characters long and must have a capital letter along with a special character"
        )
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
      role: Yup.string().required("Role is required"),
    }),
    onSubmit: (values) => {
      if (validateInput(values)) {
        let formdata = {
          name: values.username,
          email: values.email,
          password: values.password,
          role: values.role,
          skills: values.skills,
        };
        console.log(formdata);
        fetch("http://localhost:3000/api/auth/register", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formdata),
        })
          .then((response) => response.json())
          .then((data) => {
            document.cookie = `token=${data.token}; path=/;`;
            document.cookie = `email=${data.email}; path=/;`;
            navigate("../");
          });
      }
    },
  });

  const validateInput = (values) => {
    const { username, email, password, confirmPassword } = values;

    if (!username) {
      toast.error("Username must be entered");
      return false;
    }

    if (!email) {
      toast.error("Email must be entered");
      return false;
    }

    if (!password) {
      toast.error("Password must be entered");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password must match");
      return false;
    }

    return true;
  };

  return (
    <div className="signup-page-area pd-top-120 pd-bottom-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-7">
            <form className="signin-inner" onSubmit={formik.handleSubmit}>
              <div className="row">
                <div className="col-12">
                  <div
                    className={`single-input-inner ${
                      formik.errors.username && formik.touched.username
                        ? "is-invalid"
                        : ""
                    }`}
                  >
                    <input
                      type="text"
                      placeholder="Username"
                      name="username"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.username}
                    />
                  </div>
                  {formik.errors.username && formik.touched.username && (
                    <div className="error-message">
                      {formik.errors.username}
                    </div>
                  )}
                </div>
                <div className="col-12">
                  <div
                    className={`single-input-inner ${
                      formik.errors.email && formik.touched.email
                        ? "is-invalid"
                        : ""
                    }`}
                  >
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
                    <div className="error-message">{formik.errors.email}</div>
                  )}
                </div>
                <div className="col-12">
                  <div
                    className={`single-input-inner ${
                      formik.errors.email && formik.touched.email
                        ? "is-invalid"
                        : ""
                    }`}
                  >
                    <input
                      type="text"
                      placeholder="Enter your skills"
                      name="skills"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.skills}
                    />
                  </div>
                  {formik.errors.skills && formik.touched.skills && (
                    <div className="error-message">{formik.errors.skills}</div>
                  )}
                </div>
                <div className="col-12">
                  <div
                    className={`single-input-inner ${
                      formik.errors.confirmPassword && formik.touched.confirmPassword
                        ? "is-invalid"
                        : ""
                    }`}
                  >
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                  </div>
                  {formik.errors.password && formik.touched.password && (
                    <div className="error-message">
                      {formik.errors.password}
                    </div>
                  )}
                </div>
                <div className="col-12">
                  <div
                    className={`single-input-inner ${
                      formik.errors.password && formik.touched.password
                        ? "is-invalid"
                        : ""
                    }`}
                  >
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmPassword}
                    />
                  </div>
                  {formik.errors.password && formik.touched.confirmPassword && (
                    <div className="error-message">
                      {formik.errors.confirmPassword}
                    </div>
                  )}
                </div>
                

                <div
                  className={` col-12 single-input-inner ${
                    formik.errors.role && formik.touched.role
                      ? "is-invalid"
                      : ""
                  }`}
                >
                  <select
                    name="role"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.role}
                  >
                    <option value="">Select Role</option>
                    <option value="volunteer">Volunteer</option>
                    <option value="mentor">Mentor</option>
                    <option value="student">Student</option>
                  </select>
                </div>
                {formik.errors.role && formik.touched.role && (
                  <div className="error-message">{formik.errors.role}</div>
                )}

                <div className="col-12 mb-4">
                  <button className="btn btn-base w-100" type="submit">
                    Create Account
                  </button>
                </div>
                <div className="col-12">
                  <span>Already have an account!! </span>
                  <a href="../signin">
                    <strong>Signin</strong>
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

import "./assets/css/style.css";
import "./assets/css/responsive.css";
import "./assets/css/vendor.css";
import "./assets/js/main";

import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import CourseDetailsPage from "./pages/CourseDetailsPage";
import CoursePage from "./pages/CoursePage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import Preloader from "./components/Preloader";
import SearchPopup from "./components/SearchPopup";
import Footer from "./components/Footer";
import CarouselExample from "./components/Carousel/CarouselExample";

import MyCourses from "./pages/MyCourses";
import ApplyNowPage from "./pages/ApplyNowPage";

function App() {
  return (
    <>
      <Preloader />
      <SearchPopup />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course-details/:id" element={<CourseDetailsPage />} />
        <Route path="/course" element={<CoursePage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/carousel" element={<CarouselExample />} />
        <Route path="/mycourses" element={<MyCourses />} />
        <Route path="/applynow" element={<ApplyNowPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

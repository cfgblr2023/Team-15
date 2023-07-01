import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Intro from "../components/Intro";
import CourseHome from "../components/course/CourseHome";
import Work from "../components/Work";

export default function Home() {
  return (
    <>
      <Navbar />
      <Banner />
      <Intro />
      <CourseHome />
      <Work />
    </>
  );
}

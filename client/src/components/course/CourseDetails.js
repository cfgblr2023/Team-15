import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CourseDetails(props) {
  let navigate = useNavigate();
  const [course, setCourses] = useState({});
  const [isEnrolled, setEnrolled] = useState(false);
  const [isCookie, setCookie] = useState(false);
  const [cart, setCart] = useState([]);
  const [text, setText] = useState("");
  const [transcript, setTransscript] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };
  useEffect(() => {
    checktoken();
    checkcart();
  }, []);
  useEffect(() => {
    getTranscript();
  }, [course?.video]);

  //   useEffect(() => {
  //     fetch(`http://localhost:3000/api/registeredcourses/${getmail()}`)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         if (data.courses.includes(props.id)) {
  //           setEnrolled(true);
  //           setText("COURSE PURCHASED");
  //         }
  //       });
  //   }, [isCookie]);

  useEffect(() => {
    fetch("http://localhost:3000/api/courses/" + props.id)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCourses(data);
      });
    console.log(cart);
    if (cart) {
      if (cart.includes(props.id)) {
        setEnrolled(true);
        setText("ADDED TO CART");
      }
    }
  }, [cart]);

  const getTranscript = () => {
    axios.post("http://localhost:3000/api/transcript",{url:course?.video}).then((res) => {
      console.log(res.data);
      setTransscript(
        res.data.transcription.results.channels[0].alternatives[0].transcript
      );
    });
  };
  function checktoken() {
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      if (c.substring(0, 5) === "token") {
        setCookie(true);
        return;
      }
    }
    setCookie(false);
  }

  function checkcart() {
    console.log("hello");
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      if (c.substring(1, 5) === "cart") {
        console.log(JSON.parse(c.substring(6)));
        setCart(JSON.parse(c.substring(6)));
        return;
      }
    }
    setCart([]);
  }

  function getmail() {
    return localStorage.getItem("email");
  }

  function handleClick() {
    console.log(isCookie);
    if (!isCookie) {
      navigate("../signin");
    } else {
      console.log("enroll course clicked");
      let courses = cart;
      if (cart) {
        courses.push(props.id);
      } else {
        courses = [props.id];
      }
      document.cookie = `cart=${JSON.stringify(courses)}; path=/;`;
      setEnrolled(true);
      setText("ADDED TO CART");
      props.updateUI(true);
    }
  }

  return (
    <div className="course-single-area pd-top-120 pd-bottom-90">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="course-course-detaila-inner">
              <div className="details-inner">
                <div className="emt-user">
                  <span className="align-self-center">{course.instructor}</span>
                </div>
                <h3 className="title">{course.title}</h3>
              </div>
              <div className="thumb">
                <img src={course?.img} alt="img" />
              </div>
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="tab1"
                  role="tabpanel"
                  aria-labelledby="tab1-tab"
                >
                  <div className="course-details-content">
                    <p>{course.desc}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
            <video
        src={course?.video}
        controls={true}
        autoPlay={isPlaying}
        onPause={handlePause}
        onPlay={handlePlay}
      />

            </div>
            {transcript && (
              <div className="row">
                <h3>Transcript</h3>
                <div className="course-details-content">
                  <p>{transcript}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

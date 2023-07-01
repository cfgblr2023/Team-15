import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function CourseDetails(props) {

    let navigate = useNavigate()
    const [course, setCourses] = useState({})
    const [isEnrolled, setEnrolled] = useState(false)
    const [isCookie, setCookie] = useState(false)
    const [cart, setCart] = useState([])
    const [text, setText] = useState("")

    useEffect(() => {
        checktoken()
        checkcart()
    }, [])

    useEffect(() => {
        fetch(`http://localhost:3000/api/registeredcourses/${getmail()}`)
            .then(response => response.json())
            .then(data => {
                if(data.courses.includes(props.id)){
                    setEnrolled(true)
                    setText("COURSE PURCHASED")
                }
            })
    }, [isCookie])

    useEffect(() => {
        fetch('http://localhost:3000/api/courses/' + props.id)
            .then(response => response.json())
            .then(data => {
                setCourses(data)
            })
        console.log(cart)
        if (cart) {

            if (cart.includes(props.id)) {
                setEnrolled(true)
                setText("ADDED TO CART")
            }
        }
    }, [cart])

    function checktoken() {
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            if (c.substring(0, 5) === "token") {
                setCookie(true)
                return
            }
        }
        setCookie(false)
    }

    function checkcart() {
        console.log("hello")
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            if (c.substring(1, 5) === "cart") {
                console.log(JSON.parse(c.substring(6)))
                setCart(JSON.parse(c.substring(6)))
                return
            }
        }
        setCart([])
    }

    function getmail() {
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            if (c.substring(1, 6) === "email") {
                return c.substring(7)
            }
        }
        return 
    }

    function handleClick() {
        console.log(isCookie)
        if (!isCookie) {
            navigate("../signin")
        }
        else {
            console.log("enroll course clicked")
            let courses = cart
            if (cart) {
                courses.push(props.id)
            }
            else {
                courses = [props.id]
            }
            document.cookie = `cart=${JSON.stringify(courses)}; path=/;`
            setEnrolled(true)
            setText("ADDED TO CART")
            props.updateUI(true)
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
                                <img src={require("../../assets/img/course/9.png")} alt="img" />
                            </div>
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="tab1" role="tabpanel" aria-labelledby="tab1-tab">
                                    <div className="course-details-content">
                                        <p>{course.desc}</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="td-sidebar">
                            <div className="widget widget_feature">
                                <h4 className="widget-title">Course Features</h4>
                                <ul>
                                    <li><i className="fa fa-user"></i><span>Enrolled :</span> 1200 students</li>
                                    <li><i className="fa fa-clock-o"></i><span>Duration :</span>{course.duration}</li>
                                    <li><i className="fa fa-clipboard"></i><span>Lectures :</span> {course.lectures}</li>
                                    <li><i className="fa fa-clone"></i><span>Categories:</span> {course.category}</li>
                                    <li><i className="fa fa-tags"></i><span>Tags:</span> {course.tags}</li>
                                    <li><i className="fa fa-clipboard"></i><span>Instructor:</span> {course.instructor}</li>
                                </ul>
                                <div className="price-wrap text-center">
                                    <h5>Price:<span>$54.00</span></h5>
                                    <button className="btn btn-base btn-radius" onClick={handleClick} disabled={isEnrolled}>{isEnrolled ? text : "ENROLL COURSE"}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
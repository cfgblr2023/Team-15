import CourseItem from "./CourseItem"
import { useState, useEffect } from "react"

const divStyle = {
    padding: "1vh"
}

export default function PaidCourses() {
    const [course, setCourses] = useState([])

    useEffect(() => {
        fetch_paid_courses()
    }, [])

    async function fetch_paid_courses() {
        const res = await fetch(`http://localhost:3000/api/registeredcourses/${getmail()}`)
        const user = await res.json()
        await fetch_course(user)
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

    function fetch_course(data) {
        return new Promise((resolve, reject) => {
            let course_arr = []
            for (let ele of data.courses) {
                fetch('http://localhost:3000/api/courses/' + ele)
                    .then(response => response.json())
                    .then(data => {
                        // course_arr = course;
                        // console.log(course_arr)
                        course_arr.push(data)
                        setCourses(course_arr)
                    })
            }
            resolve(course)
        })
    }

    return (
        course.length == 0
            ? <h1 className="b-animate-2 title">You have not purchased any course yet.</h1>
            :
            <div className="container">
                <div className="row" style={divStyle}>
                    <div className="col-lg-8 order-lg-12">
                        <div className="row">
                            <CourseItem item={course} page="filter" />
                        </div>
                    </div>
                </div>
            </div>
    )
}
import { useState } from "react"
import FetchCourse from "./FetchCourse"

export default function CourseHome() {

    const [isActive, setActive] = useState("tab1-tab")
    const [Course, setCourse] = useState("hi")

    function handleClick(event) {
        setActive(event.currentTarget.id)
        setCourse(event.currentTarget.innerHTML)

    }
    return (
        <div className="course-area pd-top-100 pd-bottom-90">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-8 col-lg-10 col-md-11">
                        <div className="section-title style-white text-center">
                            <h2 className="title">Top Featured Courses</h2>
                        </div>
                    </div>
                </div>
               
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="tab1" role="tabpanel" aria-labelledby="tab1-tab">
                        <div className="row">
                            <FetchCourse category={Course} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
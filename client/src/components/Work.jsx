
export default function Work(){
    return(
        <div className="work-area pd-top-110">
        <div className="container">
            <div className="section-title">
                <div className="row">
                    <div className="col-lg-6 align-self-center">
                        {/* <h6 className="sub-title right-line">What we do</h6> */}
                        <h2 className="title">What we do</h2>
                    </div>
                    <div className="col-lg-6 align-self-center">
                        <p className="content mt-lg-0">Lamp Educational and Charitable Trust is a non-profit organization started in 2010 by Jaganathan Rajagopal in Bangalore.

When he was working in a corporate company, often he was visiting NGOs, Old Age Homes, Cancer Hospitals, and Government Schools in Bangalore as part of CSR activities, after listening to many students’ painful stories, he volunteered to donate part of his salary and also collected donations from his friends to pay fees to the school and college dropout students. Later we started donating textbooks, notebooks, stationaries, uniforms, new & old dresses, and ration kits.</p>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center " style={{height:"100%"}}>
                <div className=" col-md-6" color="ffc107" >
                    <div className="single-intro-inner style-icon-bg bg-gray text-center">
                        <div className="thumb">
                            <img src={require("../assets/img/icon_1.jpg")} alt="img" />
                        </div>
                        <div className="details">
                            <h5>Tailored user experience</h5>
                            <p>Intuitive and sleek user interface </p>
                            {/* <a className="read-more-text" href="signup.html">Read More <i className="fa fa-angle-right"></i></a> */}
                        </div>
                    </div>
                </div>
                <div className=" col-md-6">
                    <div className="single-intro-inner style-icon-bg bg-gray text-center">
                        <div className="thumb">
                            <img src={require("../assets/img/icon_2.jpg")} alt="img" />
                        </div>
                        <div className="details">
                            <h5>User Roles</h5>
                            <p>Student,Mentor and Volunteer</p>
                            {/* <a className="read-more-text" href="course.html">Read More <i className="fa fa-angle-right"></i></a> */}
                        </div>
                    </div>
                </div>
                <div className=" col-md-6">
                    <div className="single-intro-inner style-icon-bg bg-gray text-center">
                        <div className="thumb">
                            <img src={require("../assets/img/icon_3.jpg")} alt="img" />
                        </div>
                        <div className="details">
                            <h5>Empowers users</h5>
                            <p>Empowers students and volunteers</p>
                            {/* <a className="read-more-text" href="course-details.html">Read More <i className="fa fa-angle-right"></i></a> */}
                        </div>
                    </div>
                </div>
                <div className=" col-md-6">
                    <div className="single-intro-inner style-icon-bg bg-gray text-center">
                        <div className="thumb">
                            <img src={require("../assets/img/icon_4.jpg")} alt="img" />
                        </div>
                        <div className="details">
                            <h5>User focused</h5>
                            <p>Learning Management System</p>
                            {/* <a className="read-more-text" href="blog-details.html">Read More <i className="fa fa-angle-right"></i></a> */}
                        </div>
                    </div>
                </div>
                <div className=" col-md-6">
                    <div className="single-intro-inner style-icon-bg bg-gray text-center">
                        <div className="thumb">
                            <img src={require("../assets/img/icon_5.jpg")} alt="img" />
                        </div>
                        <div className="details">
                            <h5>Accessible to everyone</h5>
                            <p>Translations in 10+ languages and transcripts available</p>
                            {/* <a className="read-more-text" href="blog-details.html">Read More <i className="fa fa-angle-right"></i></a> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
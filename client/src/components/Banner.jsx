import { Link } from "react-router-dom";
import banner1 from "../assets/img/logofinal.jpg"
export default function Banner(){
    return(
        <div className="banner-area banner-area-1 bg-gray">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-5 col-md-8 order-lg-12 align-self-center">
                    <div className="thumb b-animate-thumb">
                        <img src={banner1} alt="img" height="350" width="800 px"/>
                    </div>
                </div>
                <div className="col-lg-7 order-lg-1 align-self-center">
                    <div className="banner-inner text-center text-lg-left mt-5 mt-lg-0">
                        {/* <!-- <h6 className="b-animate-1 sub-title">DISCOVER RESEARCH</h6> --> */}
                        <h1 className="b-animate-2 title">WE ARE ON A MISSION TO HELP THE HELPLESS</h1>
                        <h6>“Light The Lamp of Education to End Poverty”</h6>                
                        </div>
                </div>
            </div>
        </div>
    </div>
    )
}
export default function Footer() {
  return (
    <>
      <footer className="footer-area bg-gray">
        <div className="footer-top">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6">
                <img src={require("../assets/img/footer-logo.png")} alt="img" />
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="widget widget_contact">
                  <h4 className="widget-title">Contact Us</h4>
                  <ul className="details">
                    <li>
                      <i className="fa fa-map-marker"></i> 1281, 9th Cross, 1st
                      Main, RK Hegde Nagar, Bengaluru - 560077
                    </li>
                    <li>
                      <i className="fa fa-envelope"></i>{" "}
                      help@lampeducationtrust.com
                    </li>
                    <li>
                      <i className="fa fa-phone"></i>+91 9008701080
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <ul className="social-media mt-md-0 mt-3">
                  <li>
                    <a className="facebook" href="#">
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a className="twitter" href="#">
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a className="instagram" href="#">
                      <i className="fa fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a className="youtube" href="#">
                      <i className="fa fa-youtube"></i>
                    </a>
                  </li>
                  <li>
                    <a className="pinterest" href="#">
                      <i className="fa fa-pinterest"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

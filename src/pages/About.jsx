
import React, { useState, useEffect } from "react";
import OwlCarousel from 'react-owl-carousel';
import 'animate.css';
// import OwlCarousel from 'react-owl-carousel';


function About(){
  const [loading, setLoading] = useState(true);

  const headerOptions = {
    items: 1,
    loop: true,
    autoplay: true,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    dots: false,
    nav: true,
    navText: ["<i class='bi bi-chevron-left'></i>", "<i class='bi bi-chevron-right'></i>"],
  };

  const projectOptions = {
    items: 3,
    loop: true,
    autoplay: true,
    margin: 30,
    dots: true,
    nav: true,
    navText: ["<i class='bi bi-chevron-left'></i>", "<i class='bi bi-chevron-right'></i>"],
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      992: { items: 3 }
    }
  };

  const teamOptions = {
    items: 4,
    loop: true,
    autoplay: true,
    margin: 30,
    dots: false,
    nav: true,
    navText: ["<i class='bi bi-chevron-left'></i>", "<i class='bi bi-chevron-right'></i>"],
    responsive: {
      0: { items: 1 },
      576: { items: 2 },
      768: { items: 3 },
      992: { items: 4 }
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // simulate loading delay
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div id="spinner" className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-green" style={{width: '3rem', height: '3rem'}} role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
  
  
  return(
    
    <div>
    {/* Spinner Start */}
    {/* <div id="spinner" className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
      <div className="spinner-border text-green" style={{width: '3rem', height: '3rem'}} role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div> */}
    {/* Spinner End */}
    {/* Topbar Start */}
    <div className="container-fluid topbar px-0 d-none d-lg-block">
      <div className="container px-0">
        <div className="row gx-0 align-items-center" style={{height: '45px'}}>
          <div className="col-lg-8 text-center text-lg-start mb-lg-0">
            <div className="d-flex flex-wrap">
              <a href="/" className="text-white me-4"><i className="fas fa-map-marker-alt text-green me-2" />Find A Location</a>
              <a href="/" className="text-white me-4"><i className="fas fa-phone-alt text-green me-2" />0777890234</a>
              <a href="/" className="text-white me-0"><i className="fas fa-envelope text-green me-2" />Pineappleai@gmail.com</a>
            </div>
          </div>
          <div className="col-lg-4 text-center text-lg-end">
            <div className="d-flex align-items-center justify-content-end">
              <a href="/" className="btn btn-primary btn-square rounded-circle nav-fill me-3"><i className="fab fa-facebook-f text-green" /></a>
              <a href="/" className="btn btn-primary btn-square rounded-circle nav-fill me-3"><i className="fab fa-twitter text-green" /></a>
              <a href="/" className="btn btn-primary btn-square rounded-circle nav-fill me-3"><i className="fab fa-instagram text-green" /></a>
              <a href="https://www.linkedin.com/company/pineappleaicloud/" className="btn btn-primary btn-square rounded-circle nav-fill me-0"><i className="fab fa-linkedin-in text-green" /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Topbar End */}
    {/* Navbar & Hero Start */}
    <div className="container-fluid sticky-top px-0">
      <div className="position-absolute bs-green" style={{left: 0, top: 0, width: '100%', height: '50%'}}>
      </div>
      <div className="container px-0">
        <nav className="navbar navbar-expand-lg navbar-dark bg-white py-3 px-4">
          <a href="/" className="navbar-brand p-0">
            <h1 className="text-green m-0"><img src="img/lo.png" alt="Logo" /></h1>     
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span className="fa fa-bars" />
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ms-auto py-0">
          
              <a href="/" className="nav-item nav-link">About</a>
              
            </div>
            <div className="d-flex align-items-center flex-nowrap pt-xl-0">
              <button className="btn btn-dark btn-md-square mx-2" data-bs-toggle="modal" data-bs-target="#searchModal"><i className="fas fa-search" /></button>
              <a href="/" className="btn btn-dark rounded-pill text-white py-2 px-4 ms-2 flex-wrap flex-sm-shrink-0">Careers</a>
            </div>
          </div>
        </nav>
      </div>
    </div>
    {/* Navbar & Hero End */}
    {/* Modal Search Start */}
    <div className="modal fade" id="searchModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-fullscreen">
        <div className="modal-content rounded-0">
          <div className="modal-header">
            <h4 className="modal-title mb-0" id="exampleModalLabel">Search by keyword</h4>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className="modal-body d-flex align-items-center">
            <div className="input-group w-75 mx-auto d-flex">
              <input type="search" className="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1" />
              <span id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search" /></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Modal Search End */}
   

    {/* About Start */}
    <div className="container-fluid about bg-light py-5">
      <div className="container py-5">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6 col-xl-5 wow fadeInLeft" data-wow-delay="0.1s">
            <div className="about-img">
              <img src="img/about-3.jpg" className="img-fluid w-100 rounded-top bg-white" alt="Image" />
              <img src="img/ab.jpg" className="img-fluid w-100 rounded-bottom" alt="Image" />
            </div>
          </div>
          <div className="col-lg-6 col-xl-7 wow fadeInRight" data-wow-delay="0.3s">
          <br></br>
            <h4 className="text-green">About Us</h4>
           
            <h1 className="text-darkgreen">The most Profitable Software company in worldwide.</h1>
            <p className="text ps-4 mb-4">PineappleAI creates smart, user-friendly AI solutions for everyone. Founded in 2024, we are dedicated to innovation and excellent customer support. Join us in making everyday tasks simpler and smarter!
            </p>
            <div className="row g-4 justify-content-between mb-5">
              <div className="col-lg-6 col-xl-5">
                <p className="text-dark"><i className="fas fa-check-circle text-green me-1" /> Strategy &amp; Consulting</p>
                <p className="text-dark mb-0"><i className="fas fa-check-circle text-green me-1" /> Dedicated to Innovation</p>
              </div>
              <div className="col-lg-6 col-xl-7">
                <p className="text-dark"><i className="fas fa-check-circle text-green me-1" /> Smart AI Solutions</p>
                <p className="text-dark mb-0"><i className="fas fa-check-circle text-green me-1" /> Continuous Improvement</p>
              </div>
            </div>
            <div className="row g-4 text-center align-items-center justify-content-center">
              <div className="col-sm-4">
                <div className="bg-secondary rounded p-4">
                  <div className="d-flex align-items-center justify-content-center">
                    <span className="counter-value fs-1 fw-bold text-white" data-toggle="counter-up">5</span>
                    <h4 className="text-white fs-1 mb-0" style={{fontWeight: 600, fontSize: '25px'}}>+</h4>
                  </div>
                  <div className="w-100 d-flex align-items-center justify-content-center">
                    <p className="text-white mb-0">Project Complete</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="bg-success rounded p-4">
                  <div className="d-flex align-items-center justify-content-center">
                    <span className="counter-value fs-1 fw-bold text-white" data-toggle="counter-up">7</span>
                    <h4 className="text-white fs-1 mb-0" style={{fontWeight: 600, fontSize: '25px'}}>+</h4>
                  </div>
                  <div className="w-100 d-flex align-items-center justify-content-center">
                    <p className="text-white mb-0">Years Of Experience</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="bg-secondary rounded p-4">
                  <div className="d-flex align-items-center justify-content-center">
                    <span className="counter-value fs-1 fw-bold text-white" data-toggle="counter-up">7</span>
                    <h4 className="text-white fs-1 mb-0" style={{fontWeight: 600, fontSize: '25px'}}>+</h4>
                  </div>
                  <div className="w-100 d-flex align-items-center justify-content-center">
                    <p className="text-white mb-0">Team Members</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* About End */}
    
   
    
{/* Team Start */}
<div className="container-fluid team pb-5">
        <div className="container pb-5">
          <div className="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: '800px' }}>
            <h4 className="text-green">Our Team</h4>
            <h1 className="text-darkgreen">Our PineappleAI Company Dedicated Team Members</h1>
          </div>
          <OwlCarousel className="team-carousel owl-carousel" {...teamOptions}>
            <div className="team-item rounded">
              <div className="team-img">
                <img src="img/mat.jpg" className="img-fluid w-100 rounded-top fixed-size-image" alt="Image" />
                <div className="team-icon">
                  <a className="btn btn-primary btn-sm-square text-white rounded-circle mb-3" href="#"><i className="fas fa-share-alt" /></a>
                  <div className="team-icon-share">
                    <a className="btn btn-primary btn-sm-square text-white rounded-circle mb-3" href="#"><i className="fab fa-facebook-f" /></a>
                    <a className="btn btn-primary btn-sm-square text-white rounded-circle mb-3" href="#"><i className="fab fa-twitter" /></a>
                    <a className="btn btn-primary btn-sm-square text-white rounded-circle mb-0" href="#"><i className="fab fa-instagram" /></a>
                  </div>
                </div>
              </div>
              <div className="team-content bg-light text-center rounded-bottom p-4">
                <div className="team-content-inner rounded-bottom">
                  <h4 className="text-black">Mis.K.Mathumitha</h4>
                  <p className="text-muted mb-0">QA Engineer(Intern)</p>
                </div>
              </div>
            </div>
            <div className="team-item rounded">
              <div className="team-img">
                <img src="img/su.jpg" className="img-fluid w-100 rounded-top fixed-size-image" alt="Image" />
                <div className="team-icon">
                  <a className="btn btn-primary btn-sm-square text-white rounded-circle mb-3" href="#"><i className="fas fa-share-alt" /></a>
                  <div className="team-icon-share">
                    <a className="btn btn-primary btn-sm-square text-white rounded-circle mb-3" href="#"><i className="fab fa-facebook-f" /></a>
                    <a className="btn btn-primary btn-sm-square text-white rounded-circle mb-3" href="#"><i className="fab fa-twitter" /></a>
                    <a className="btn btn-primary btn-sm-square text-white rounded-circle mb-0" href="#"><i className="fab fa-instagram" /></a>
                  </div>
                </div>
              </div>
              <div className="team-content bg-light text-center rounded-bottom p-4">
                <div className="team-content-inner rounded-bottom">
                  <h4 className="text-black">Mr.T.Subothavajan</h4>
                  <p className="text-muted mb-0">Mobileapp Engineer(Intern)</p>
                </div>
              </div>
            </div>
            <div className="team-item rounded">
              <div className="team-img">
                <img src="img/nivet.jpg" className="img-fluid w-100 rounded-top fixed-size-image" alt="Image" />
                <div className="team-icon">
                  <a className="btn btn-primary btn-sm-square text-white rounded-circle mb-3" href="#"><i className="fas fa-share-alt" /></a>
                  <div className="team-icon-share">
                    <a className="btn btn-primary btn-sm-square text-white rounded-circle mb-3" href="#"><i className="fab fa-facebook-f" /></a>
                    <a className="btn btn-primary btn-sm-square text-white rounded-circle mb-3" href="#"><i className="fab fa-twitter" /></a>
                    <a className="btn btn-primary btn-sm-square text-white rounded-circle mb-0" href="#"><i className="fab fa-instagram" /></a>
                  </div>
                </div>
              </div>
              <div className="team-content bg-light text-center rounded-bottom p-4">
                <div className="team-content-inner rounded-bottom">
                  <h4 className="text-black">Mis.V.Nivethiga</h4>
                  <p className="text-muted mb-0">Fullstack Engineer(Intern)</p>
                </div>
              </div>
            </div>
            <div className="team-item rounded">
              <div className="team-img">
                <img src="img/thi.jpg" className="img-fluid w-100 rounded-top fixed-size-image" alt="Image" />
                <div className="team-icon">
                  <a className="btn btn-primary btn-sm-square text-white rounded-circle mb-3" href="#"><i className="fas fa-share-alt" /></a>
                  <div className="team-icon-share">
                    <a className="btn btn-primary btn-sm-square text-white rounded-circle mb-3" href="#"><i className="fab fa-facebook-f" /></a>
                    <a className="btn btn-primary btn-sm-square text-white rounded-circle mb-3" href="#"><i className="fab fa-twitter" /></a>
                    <a className="btn btn-primary btn-sm-square text-white rounded-circle mb-0" href="#"><i className="fab fa-instagram" /></a>
                  </div>
                </div>
              </div>
              <div className="team-content bg-light text-center rounded-bottom p-4">
                <div className="team-content-inner rounded-bottom">
                  <h4 className="text-black">Mis.R.Thivja</h4>
                  <p className="text-muted mb-0">Fullstack Engineer(Intern)</p>
                </div>
              </div>
            </div>
            <div className="team-item rounded">
              <div className="team-img">
                <img src="img/th.jpg" className="img-fluid w-100 rounded-top fixed-size-image" alt="Image" />
                <div className="team-icon">
                  <a className="btn btn-primary btn-sm-square text-white rounded-circle mb-3" href="#"><i className="fas fa-share-alt" /></a>
                  <div className="team-icon-share">
                    <a className="btn btn-primary btn-sm-square text-white rounded-circle mb-3" href="#"><i className="fab fa-facebook-f" /></a>
                    <a className="btn btn-primary btn-sm-square text-white rounded-circle mb-3" href="#"><i className="fab fa-twitter" /></a>
                    <a className="btn btn-primary btn-sm-square text-white rounded-circle mb-0" href="#"><i className="fab fa-instagram" /></a>
                  </div>
                </div>
              </div>
              <div className="team-content bg-light text-center rounded-bottom p-4">
                <div className="team-content-inner rounded-bottom">
                  <h4 className="text-black">Mis.B.Tharankitha</h4>
                  <p className="text-muted mb-0">HR(Intern)</p>
                </div>
              </div>
            </div>
          </OwlCarousel>
        </div>
      </div>
      {/* Team End */}
   
    {/* Footer Start */}
    <div className="container-fluid footer py-5 wow fadeIn" data-wow-delay="0.2s">
      <div className="container py-5">
        <div className="row g-5">
          <div className="col-md-6 col-lg-6 col-xl-3">
            <div className="footer-item d-flex flex-column">
              <div className="footer-item">
                <h4 className="text-white mb-4">Newsletter</h4>
                <p className="text-white mb-3">Connect with industry experts and embark on a journey to achieve unparalleled success.</p>
                <div className="position-relative mx-auto rounded-pill">
                  <input className="form-control rounded-pill w-100 py-3 ps-4 pe-5" type="text" placeholder="Enter your email" />
                  <button type="button" className="btn btn-primary rounded-pill position-absolute top-0 end-0 py-2 mt-2 me-2">SignUp</button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-6 col-xl-3">
            <div className="footer-item d-flex flex-column">
              <h4 className="text-white mb-4">Explore</h4>
              <a href="#"><i className="fas fa-angle-right  me-2" /> Home</a>
              <a href="#"><i className="fas fa-angle-right me-2" /> Services</a>
              <a href="#"><i className="fas fa-angle-right me-2" /> About Us</a>
              <a href="#"><i className="fas fa-angle-right me-2" /> Latest Projects</a>
              <a href="#"><i className="fas fa-angle-right me-2" /> testimonial</a>
              <a href="#"><i className="fas fa-angle-right me-2" /> Our Team</a>
              <a href="#"><i className="fas fa-angle-right me-2" /> Contact Us</a>
            </div>
          </div>
          <div className="col-md-6 col-lg-6 col-xl-3">
            <div className="footer-item d-flex flex-column">
              <h4 className="text-white mb-4">Contact Info</h4>
              <a href><i className="fa fa-map-marker-alt me-2" /> No. 34, Kaladdy amman Road, Jaffna-40000, Sri Lanka</a>
              <a href><i className="fas fa-envelope me-2" /> thepineappleai.com</a>
              {/* <a href=""><i class="fas fa-envelope me-2"></i>lakshans.pineappleai@gmail.com</a> */}
              <a href><i className="fas fa-phone me-2" /> 077-8142648</a>
              {/* <a href="" class="mb-3"><i class="fas fa-print me-2"></i> +012 345 67890</a> */}
              <div className="d-flex align-items-center">
                <a className="btn btn-light btn-md-square me-2" href><i className="fab fa-facebook-f" /></a>
                <a className="btn btn-light btn-md-square me-2" href><i className="fab fa-twitter" /></a>
                <a className="btn btn-light btn-md-square me-2" href><i className="fab fa-instagram" /></a>
                <a className="btn btn-light btn-md-square me-0" href="https://www.linkedin.com/company/pineappleaicloud/"><i className="fab fa-linkedin-in" /></a>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-6 col-xl-3">
            <div className="footer-item-post d-flex flex-column">
              <h4 className="text-white mb-4">Popular Post</h4>
              <div className="d-flex flex-column mb-3">
                <p className="text-uppercase text-white mb-2">Investment</p>
                <a href="#" className="text-white">Revisiting Your Investment &amp; Distribution Goals</a>
              </div>
              <div className="d-flex flex-column mb-3">
                <p className="text-uppercase text-white mb-2">Business</p>
                <a href="#" className="text-white">Dimensional Fund Advisors Interview with Director</a>
              </div>
              <div className="footer-btn text-start">
                <a href="#" className="btn btn-light rounded-pill px-4">View All Post <i className="fa fa-arrow-right ms-1" /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Footer End */}
    {/* Copyright Start */}
    <div className="container-fluid copyright py-4">
      <div className="container">
        <div className="row g-4 align-items-center">
          <div className="col-md-6 text-center text-md-start mb-md-0">
            <span className="text-body"><a href className="border-bottom text-white"><i className="fas fa-copyright text-light me-2" />PINEAPPLEAI.CLOUD</a>, All right reserved.</span>
          </div>
          <div className="col-md-6 text-center text-md-end text-body">
            Designed By <a className="border-bottom text-white" href>PineappleAI</a>
          </div>
        </div>
      </div>
    </div>
    {/* Copyright End */}
    {/* Back to Top */}
    <a href="#" className="btn btn-primary btn-lg-square back-to-top"><i className="fa fa-arrow-up" /></a>   
    {/* JavaScript Libraries */}
    {/* Template Javascript */}
  </div>

  )
}

export default About;
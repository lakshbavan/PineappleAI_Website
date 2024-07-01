import axios from 'axios';
import React, { useState, useEffect } from "react";
import OwlCarousel from 'react-owl-carousel';
import 'animate.css';

function About() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  
  // Define individual states for each form field
  const [aboutusHead, setAboutusHead] = useState('');
  const [aboutusDes, setAboutusDes] = useState('');
  const [img1, setImg1] = useState('');
  const [img2, setImg2] = useState('');
  const [checkbox1, setCheckbox1] = useState('');
  const [checkbox2, setCheckbox2] = useState('');
  const [checkbox3, setCheckbox3] = useState('');
  const [checkbox4, setCheckbox4] = useState('');
  const [proComTxt, setProComTxt] = useState('');
  const [proComNum, setProComNum] = useState('');
  const [teamMemTxt, setTeamMemTxt] = useState('');
  const [teamMemNum, setTeamMemNum] = useState('');
  const [yrsOfExpTxt, setYrsOfExpTxt] = useState('');
  const [yrsOfExpNum, setYrsOfExpNum] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/aboutus/view1')
      .then(result => {
        const data = result.data;
        setData(data);

        // Initialize form fields with data from the API
        setAboutusHead(data.aboutus_head);
        setAboutusDes(data.aboutus_des);
        setImg1(data.img1);
        setImg2(data.img2);
        setCheckbox1(data.checkbox);
        setCheckbox2(data.checkbox);
        setCheckbox3(data.checkbox);
        setCheckbox4(data.checkbox);
        setProComTxt(data.pro_com_txt);
        setProComNum(data.pro_com_num);
        setTeamMemTxt(data.team_mem_txt);
        setTeamMemNum(data.team_mem_num);
        setYrsOfExpTxt(data.yrs_of_exp_txt);
        setYrsOfExpNum(data.yrs_of_exp_txt_num);
      })
      .catch(err => console.log(err))

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // simulate loading delay

    return () => clearTimeout(timer);
  }, []);

  const handleUpdate = (event) => {
    event.preventDefault();

    const updatedData = {
      aboutus_head: aboutusHead,
      aboutus_des: aboutusDes,
      img1: img1,
      img2: img2,
      checkbox: checkbox1,  // You can use different fields for different checkboxes if needed
      pro_com_txt: proComTxt,
      pro_com_num: proComNum,
      team_mem_txt: teamMemTxt,
      team_mem_num: teamMemNum,
      yrs_of_exp_txt: yrsOfExpTxt,
      yrs_of_exp_txt_num: yrsOfExpNum,
    };

    axios.put('http://localhost:5000/aboutus/update/'+data._id, updatedData)
      .then(response => {
        console.log('Data updated successfully:', response.data);
        
        setData(response.data);
      })
      .catch(err => console.log(err));
  };

  if (loading) {
    return (
      <div id="spinner" className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-green" style={{ width: '3rem', height: '3rem' }} role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Topbar Start */}
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"></link>
      <div className="container-fluid topbar px-0 d-none d-lg-block">
        <div className="container px-0">
          <div className="row gx-0 align-items-center" style={{ height: '45px' }}>
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
        <div className="position-absolute bs-green" style={{ left: 0, top: 0, width: '100%', height: '50%' }}>
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
                <input type="text" className="form-control border-primary p-3" placeholder="Type search keyword" />
                <button className="btn btn-dark px-4"><i className="fas fa-search" /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal Search End */}
      
      {/* Form Section */}
      <div className="container py-5">
        <h2>Update About Us Information</h2>
        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <label htmlFor="aboutus_head" className="form-label">About Us Headline</label>
            <input
              type="text"
              className="form-control"
              id="aboutus_head"
              value={aboutusHead}
              onChange={(e) => setAboutusHead(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="aboutus_des" className="form-label">About Us Description</label>
            <textarea
              className="form-control"
              id="aboutus_des"
              rows="3"
              value={aboutusDes}
              onChange={(e) => setAboutusDes(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="img1" className="form-label">Image 1 URL</label>
            <input
              type="text"
              className="form-control"
              id="img1"
              value={img1}
              onChange={(e) => setImg1(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="img2" className="form-label">Image 2 URL</label>
            <input
              type="text"
              className="form-control"
              id="img2"
              value={img2}
              onChange={(e) => setImg2(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="checkbox1" className="form-label">Checkbox 1</label>
            <input
              type="text"
              className="form-control"
              id="checkbox1"
              value={checkbox1}
              onChange={(e) => setCheckbox1(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="checkbox2" className="form-label">Checkbox 2</label>
            <input
              type="text"
              className="form-control"
              id="checkbox2"
              value={checkbox2}
              
            />
          </div>
          <div className="mb-3">
            <label htmlFor="checkbox3" className="form-label">Checkbox 3</label>
            <input
              type="text"
              className="form-control"
              id="checkbox3"
              value={checkbox3}
              
            />
          </div>
          <div className="mb-3">
            <label htmlFor="checkbox4" className="form-label">Checkbox 4</label>
            <input
              type="text"
              className="form-control"
              id="checkbox4"
              value={checkbox4}
              
            />
          </div>
          <div className="mb-3">
            <label htmlFor="proComTxt" className="form-label">Project complete text</label>
            <input
              type="text"
              className="form-control"
              id="proComTxt"
              value={proComTxt}
              onChange={(e) => setProComTxt(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="proComNum" className="form-label">Project complete number</label>
            <input
              type="number"
              className="form-control"
              id="proComNum"
              value={proComNum}
              onChange={(e) => setProComNum(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="teamMemTxt" className="form-label">Team Members Text</label>
            <input
              type="text"
              className="form-control"
              id="teamMemTxt"
              value={teamMemTxt}
              onChange={(e) => setTeamMemTxt(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="teamMemNum" className="form-label">Team Members Number</label>
            <input
              type="number"
              className="form-control"
              id="teamMemNum"
              value={teamMemNum}
              onChange={(e) => setTeamMemNum(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="yrsOfExpTxt" className="form-label">Years of Experience Text</label>
            <input
              type="text"
              className="form-control"
              id="yrsOfExpTxt"
              value={yrsOfExpTxt}
              onChange={(e) => setYrsOfExpTxt(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="yrsOfExpNum" className="form-label">Years of Experience Number</label>
            <input
              type="number"
              className="form-control"
              id="yrsOfExpNum"
              value={yrsOfExpNum}
              onChange={(e) => setYrsOfExpNum(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">Update</button>
        </form>
      </div>
    </div>
  );
}

export default About;
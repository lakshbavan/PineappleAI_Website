import axios from 'axios';
import React, { useState, useEffect } from "react";

import OwlCarousel from 'react-owl-carousel';
import AdminPanel from './adminpanel';
import 'animate.css';

function About() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  // Define individual states for each form field
  const [aboutusHead, setAboutusHead] = useState('');
  const [aboutusDes, setAboutusDes] = useState('');
  const [img1, setImg1] = useState(null);
  const [img2, setImg2] = useState(null);
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
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/aboutus/view1')
      .then(result => {
        const data = result.data;
        setData(data);

        // Initialize form fields with data from the API
        setAboutusHead(data.aboutus_head);
        setAboutusDes(data.aboutus_des);
        setImg1(data.img1);
        setImg2(data.img2);
        setCheckbox1(data.checkbox1);
        setCheckbox2(data.checkbox2);
        setCheckbox3(data.checkbox3);
        setCheckbox4(data.checkbox4);
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


  const handleSubmit = (event) => {
    event.preventDefault();

    if (!aboutusHead || !aboutusDes || !proComTxt || !proComNum || !teamMemTxt || !teamMemNum || !yrsOfExpTxt || !yrsOfExpNum) {
      alert('Please fill in all required fields.');
      return;
    }

    const updatedData = {
      aboutus_head: aboutusHead,
      aboutus_des: aboutusDes,
      img1: img1,
      img2: img2,
      checkbox1: checkbox1,
      checkbox2: checkbox2,
      checkbox3: checkbox3,
      checkbox4: checkbox4,
      pro_com_txt: proComTxt,
      pro_com_num: proComNum,
      team_mem_txt: teamMemTxt,
      team_mem_num: teamMemNum,
      yrs_of_exp_txt: yrsOfExpTxt,
      yrs_of_exp_txt_num: yrsOfExpNum,
    };

    if (data) {
      if (window.confirm('Do you want to update?')) {
        axios.put('http://localhost:3001/aboutus/update/' + data._id, updatedData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        })
          .then(response => {
            console.log('Data updated successfully:', response.data);
            setShowPopup(true);

            setData(response.data);
            alert('Update Successful!');
            window.location.reload();
          })
          .catch(err => console.log(err));
      }
    } else {
      // Add logic
      if (window.confirm('Do you want to add?')) {
        axios.post('http://localhost:3001/aboutus/create', updatedData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        })
          .then(response => {
            console.log('Data added successfully:', response.data);
            setShowPopup(true);
            alert('Add Successful!');
            window.location.reload();
          })
          .catch(err => console.log(err));

      }
    }
  };




  const handleDelete = () => {
    if (window.confirm('Do you want to delete?')) {
      axios.delete('http://localhost:3001/aboutus/delete/' + data._id)
        .then(response => {
          console.log('Data deleted successfully:', response.data);
          setShowPopup(true);
          alert('Delete Successful!');
          window.location.reload();
        })
        .catch(err => console.log(err));
    }
  };

  const toggleEdit = () => {
    setIsEditable(!isEditable);
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
  const isDatabaseEmpty = !data || data.length === 0;
  return (


    <div>

      {/* Form Section */}
      <AdminPanel>
        <div className="container py-5">
          <h2>Update About Us Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="aboutus_head" className="form-label w-50">About Us Headline</label>
              <input
                type="text"
                className="form-control"
                id="aboutus_head"
                value={aboutusHead}
                onChange={(e) => setAboutusHead(e.target.value)}
                disabled={!isEditable}

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
                disabled={!isEditable}
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="img1" className="form-label">Image 1 URL</label>
              <input
                type="file"
                className="form-control"
                id="img1"

                onChange={(e) => setImg1(e.target.files[0])}


              />
            </div>
            <div className="mb-3">
              <label htmlFor="img2" className="form-label">Image 2 URL</label>
              <input
                type="file"
                className="form-control"
                id="img2"

                onChange={(e) => setImg2(e.target.files[0])}

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
                disabled={!isEditable}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="checkbox2" className="form-label">Checkbox 2</label>
              <input
                type="text"
                className="form-control"
                id="checkbox2"
                value={checkbox2}
                onChange={(e) => setCheckbox2(e.target.value)}
                disabled={!isEditable}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="checkbox3" className="form-label">Checkbox 3</label>
              <input
                type="text"
                className="form-control"
                id="checkbox3"
                value={checkbox3}
                onChange={(e) => setCheckbox3(e.target.value)}
                disabled={!isEditable}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="checkbox4" className="form-label">Checkbox 4</label>
              <input
                type="text"
                className="form-control"
                id="checkbox4"
                value={checkbox4}
                onChange={(e) => setCheckbox4(e.target.value)}
                disabled={!isEditable}
                required
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
                disabled={!isEditable}
                required
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
                disabled={!isEditable}
                required
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
                disabled={!isEditable}
                required
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
                disabled={!isEditable}
                required
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
                disabled={!isEditable}
                required
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
                disabled={!isEditable}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              {isDatabaseEmpty ? 'Add' : 'Update'}
            </button>
            <button type='button' className="btn btn-secondary" onClick={toggleEdit}>
              {isEditable ? 'Disable Editing' : 'Enable Editing'}
            </button>
            <button type='button' className="btn btn-danger" onClick={handleDelete} disabled={isDatabaseEmpty}>Delete</button>
          </form>



        </div>
      </AdminPanel>
    </div>

  );
}

export default About;

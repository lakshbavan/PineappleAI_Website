import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './Carousel.css'; // Make sure to create this CSS file for additional styling

function Carousel() {
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('carousel_img_1', file);
    formData.append('carousel_des_1', description);

    axios.post("http://localhost:3001/api/carousel", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(result => {
      console.log(result);
      alert('Data submitted successfully!');
      
      // Clear form fields after successful submission
      setDescription('');
      setFile(null);

      // Navigate to '/carousel'
      navigate('/carousel');
    })
    .catch(err => {
      console.error('Error submitting form:', err);
      alert('There was an error submitting the form!');
    });
  };

  return (
    <div className='container d-flex justify-content-center align-items-center vh-100'>
      <div className='p-4 border rounded' style={{ width: '100%', maxWidth: '600px' }}>
        <h2 className='text-center mb-4'>Carousel Section</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label className='form-label'>Carousel Image</label>
            <div 
              className='drag-drop-box'
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <input
                type="file"
                onChange={handleImageChange}
                className='form-control'
                required
                style={{ display: 'none' }} // Hide the default file input
                id="fileUpload"
              />
              <label htmlFor="fileUpload" className="d-block text-center">
                {file ? file.name : "Drag & drop an image here or click to select"}
              </label>
            </div>
          </div>
          <div className='mb-3'>
            <label htmlFor="carouselDescription" className='form-label'>Carousel Description</label>
            <input
              type="text"
              id="carouselDescription"
              placeholder='Enter description'
              className='form-control'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className='d-flex justify-content-center'>
            <button type='submit' className='btn btn-primary'>Add</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Carousel;

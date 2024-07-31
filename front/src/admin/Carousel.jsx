import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';
import './Carousel.css'; 
import AdminPanel from './adminpanel';

function Carousel() {
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const navigate = useNavigate();
  const [carouselData, setCarouselData] = useState([]);
  const [currentItemId, setCurrentItemId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setImagePreviewUrl(URL.createObjectURL(selectedFile));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
    setImagePreviewUrl(URL.createObjectURL(droppedFile));
  };

  useEffect(() => {
    fetchCarouselData();
  }, []);

  const fetchCarouselData = () => {
    axios.get('http://localhost:3001/api/carousel')
        .then(result => setCarouselData(result.data))
        .catch(err => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('carousel_img_1', file);
    formData.append('carousel_des_1', description);

    if (currentItemId) {
      axios.put(`http://localhost:3001/api/carousel/${currentItemId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(result => {
        console.log(result);
        alert('Data updated successfully!');
        setDescription('');
        setFile(null);
        setImagePreviewUrl(null);
        setCurrentItemId(null);
        fetchCarouselData();
        navigate('/carousel');
      })
      .catch(err => {
        console.error('Error updating form:', err);
        alert('There was an error updating the form!');
      });
    } else {
      axios.post("http://localhost:3001/api/carousel", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(result => {
        console.log(result);
        alert('Data submitted successfully!');
        setDescription('');
        setFile(null);
        setImagePreviewUrl(null);
        fetchCarouselData();
        navigate('/carousel');
      })
      .catch(err => {
        console.error('Error submitting form:', err);
        alert('There was an error submitting the form!');
      });
    }
  };

  const handleDelete = (id) => {
    setShowModal(true);
    setDeleteItemId(id);
  };

  const confirmDelete = () => {
    if (deleteItemId) {
      axios.delete(`http://localhost:3001/api/carousel/${deleteItemId}`)
        .then(response => {
          console.log(response.data);
          // Handle success response, e.g., update the state to remove the deleted item
          setShowModal(false);
          setDeleteItemId(null);
          fetchCarouselData();
        })
        .catch(error => {
          console.error(error);
          // Handle error response
        });
    }
  };

  const handleUpdate = (item) => {
    setDescription(item.carousel_des_1);
    setFile(null);
    setImagePreviewUrl(`http://localhost:3001/images/${item.carousel_img_1}`);
    setCurrentItemId(item._id);
  };

  return (
    <AdminPanel>
      <div className='container mt-5'>
        <div className='d-flex justify-content-center align-items-center'>
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
                    style={{ display: 'none' }}
                    id="fileUpload"
                  />
                  <label htmlFor="fileUpload" className="d-block text-center">
                    {file ? file.name : "Drag & drop an image here or click to select"}
                  </label>
                </div>
                {imagePreviewUrl && (
                  <div className="mt-2 text-center">
                    <img src={imagePreviewUrl} alt="Preview" width="100" />
                  </div>
                )}
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
                <button type='submit' className='btn btn-primary'>{currentItemId ? 'Update' : 'Add'}</button>
              </div>
            </form>
          </div>
        </div>

        <div className='mt-5 d-flex justify-content-center'>
          <div className="table-responsive" style={{ maxWidth: '1000px' }}>
            <h3 className='text-center'>Carousel Data</h3>
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {carouselData.map((item, index) => (
                  <tr key={index}>
                    <td><img src={`http://localhost:3001/images/${item.carousel_img_1}`} alt='carousel' width='100' /></td>
                    <td>{item.carousel_des_1}</td>
                    <td>
                      <button className='btn btn-primary me-2' onClick={() => handleUpdate(item)}>Update</button>
                      <button className='btn btn-danger' onClick={() => handleDelete(item._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </AdminPanel>
  );
}

export default Carousel;
